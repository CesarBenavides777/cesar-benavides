import { __ } from '@wordpress/i18n';
import { UserSession } from '../types';
import { isTokenExpired } from './isTokenExpired';
import { refreshAuthToken } from '@/lib/wp/auth/actions';

export const userHandler = async ( session: UserSession ) => {
	const user : UserSession = session?.user || {} as UserSession;

	// If the user doesn't have a refresh token, they're not logged in.
	if ( ! user?.refreshToken ) {
		session.user = {
			...user,
			isLoggedIn: false,
		};

		await session.save();

		return {
			error: "User is not logged in.",
			user: user?.userData,
			isLoggedIn: user?.isLoggedIn,
		};
	}

	// If the user is missing an auth token or it is expired, try to refresh it.
	if ( ! user?.authToken || isTokenExpired( user.authToken ) ) {
		try {
			const authToken = await refreshAuthToken( user.refreshToken );

			// If the auth token is empty, log the user out.
			if ( ! authToken ) {
				session.destroy();

				return {
					error: "User is not logged in.",
					user: undefined,
					isLoggedIn: false,
				};
			}

			user.authToken = authToken;
			user.isLoggedIn = true;

			// update the user session.
			session.user = user;

			await session.save();

			return {
				user: user?.userData,
				isLoggedIn: user.isLoggedIn,
			};
		} catch ( error ) {
			// This means the mutation failed, so the user is not logged in.
			// We don't destroy the session here, because we want to keep the stale data in case the server fixes itself.

			user.isLoggedIn = false;

			session.user = user;

			await session.save();

			return {
				error: __("User is not logged in.", "axepress-labs"),
				user: user?.userData,
				isLoggedIn: user.isLoggedIn,
			};
		}
	}

	// If the user has an auth token and it's not expired, they're logged in.
	return { user };
};
