import { gql } from "@apollo/client";

// GLOBAL
const MENU_FRAGMENT = gql`
  fragment MenuFragment on MenuItem {
    id
    label
    uri
    path
    parentId
    cssClasses
    menu {
      node {
        name
      }
    }
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    auth {
      authToken
      authTokenExpiration
      isUserSecretRevoked
      refreshToken
      refreshTokenExpiration
      userSecret
    }
    avatar {
      default
      extraAttr
      forceDefault
      foundAvatar
      height
      isRestricted
      rating
      scheme
      size
      url
      width
    }
    databaseId
    description
    email
    firstName
    id
    lastName
    name
    nicename
    nickname
    username
  }
`;

export const LOGIN = gql`
  mutation loginWithPassword($username: String!, $password: String!) {
    login(
      input: {
        provider: PASSWORD # This tells the mutation to use the WordPress username/password authentication method.
        credentials: {
          # This is the input required for the PASSWORD provider.
          username: $username
          password: $password
        }
        
      }
    ) {
      authToken
      authTokenExpiration
      refreshToken
      refreshTokenExpiration
      user {
        # The authenticated WordPress user.
        ...UserFields
      }
      # The following fields are available if WPGraphQL for WooCommerce is installed.
      wooSessionToken
      # customer {
      #   ...MyCustomerFrag
      # }
    }
  }
  ${USER_FIELDS}
`;

export const LOGIN_WITH_OAUTH = gql`
  mutation login(
    $provider: LoginProviderEnum! # One of the enabled Authentication Provider types. e.g. FACEBOOK, or OAUTH2_GENERIC
    $code: String! # The Authorization Code sent by the Authentication Provider to the frontend's callback URI.
    $state: String # A randomly-generated string used to verify the authenticity of the response sent by the Provider.
  ) {
    login(
      input: {
        provider: $provider
        oauthResponse: { state: $state, code: $code }
      }
    ) {
      authToken
      authTokenExpiration
      refreshToken
      refreshTokenExpiration
      user {
        ...UserFields
      }
      wooSessionToken
      # customer {
      #   ...MyCustomerFrag
      # }
    }
  }
  ${USER_FIELDS}
`;

export const GET_ALL_POSTS = gql`
  query AllPostsQuery {
    posts(first: 100) {
      nodes {
        id
        slug
        date
        modified
      }
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query AllPagesQuery {
    pages(first: 100) {
      nodes {
        id
        slug
        date
        modified
      }
    }
  }
`;

const GLOBAL_OPTIONS_FRAGMENT = gql`
  fragment GlobalOptionsFragment on RootQuery {
    siteSettings {
      globalOptions {
        xLink
        name
        linkedinLink
        githubLink
        email
      }
    }
  }
`;

export const GET_LAYOUT = gql`
  query GetLayout {
    generalSettings {
      title
      description
    }
    ...GlobalOptionsFragment
    primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      nodes {
        ...MenuFragment
      }
    }
    footerMenuItems: menuItems(where: { location: FOOTER }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
  ${GLOBAL_OPTIONS_FRAGMENT}
`;

export const MEDIA_ITEM_FRAGMENT = gql`
  fragment MediaItemFragment on MediaItem {
    id
    altText
    sourceUrl
    mediaDetails {
      height
      width
    }
    dataUrl
    sizes
    sourceUrl
    srcSet
  }
`;

export const BLOCKS_FRAGMENT = gql`
  fragment BlocksFragment on PageContent {
    blocks {
      ... on PageContentBlocksHeroLayout {
        body
        title
        subCaption
        variant
        media {
          node {
            ...MediaItemFragment
          }
        }
      }
      # Form Block
      ... on PageContentBlocksFormblockLayout {
        gravityformid
        showTitle
        showDescription
      }
      # Projects Block
      ... on PageContentBlocksProjectsBlockLayout {
        uniqueId
        projectItems {
          edges {
            node {
              ... on Project {
                id
                title
                featuredImage {
                  node {
                    ...MediaItemFragment
                  }
                }
                date
                excerpt
                projectTags {
                  nodes {
                    name
                    slug
                  }
                }
                uri
                projectOptions {
                  githubLink
                  liveLink
                }
              }
            }
          }
        }
      }
      # Posts Block
      ... on PageContentBlocksPostsBlockLayout {
        uniqueId
        postItems {
          edges {
            node {
              ... on Post {
                id
                title
                excerpt
                featuredImage {
                  node {
                    ...MediaItemFragment
                  }
                }
                uri
                tags {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
      # Rich Content Block
      ... on PageContentBlocksRichContentLayout {
        mainTitle
        uniqueId
        animateOnScroll
        lineSeparated
        paragraphs {
          title
          content
          cta {
            url
            title
          }
        }
      }
      # Code Block
      ... on PageContentBlocksCodeBlockLayout {
        mainTitle
        accordion
        files {
          filename
          code
          language
          source {
            url
            title
          }
        }
      }
    }
  }
`;

export const GET_POST_CONTENT_FRAGMENT = gql`
  fragment PostContentFragment on Post {
    pageContent {
      ...BlocksFragment
    }
    tags {
      nodes {
        name
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
  ${BLOCKS_FRAGMENT}
`;

export const GET_PAGE_CONTENT_FRAGMENT = gql`
  fragment PageContentFragment on Page {
    pageContent {
      ...BlocksFragment
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
  ${BLOCKS_FRAGMENT}
`;

export const SEO_FRAGMENT = gql`
  fragment SEOFragment on PostTypeSEO {
    twitterTitle
    twitterImage {
      sourceUrl
    }
    twitterDescription
    title
    readingTime
    opengraphUrl
    opengraphType
    opengraphTitle
    opengraphSiteName
    opengraphPublisher
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphImage {
      sourceUrl
    }
    opengraphDescription
    opengraphAuthor
    metaRobotsNoindex
    metaRobotsNofollow
    metaKeywords
    metaDesc
    fullHead
    focuskw
    cornerstone
    canonical
    breadcrumbs {
      text
      url
    }
    schema {
      articleType
      pageType
      raw
    }
  }
`;

export const SEO_CONFIG_FRAGMENT = gql`
  fragment SEOConfigFragment on SEOConfig {
    webmaster {
      baiduVerify
      googleVerify
      msVerify
      yandexVerify
    }
    social {
      facebook {
        url
      }
      instagram {
        url
      }
      linkedIn {
        url
      }
      otherSocials
      twitter {
        username
      }
      youTube {
        url
      }
    }
    schema {
      companyLogo {
        sourceUrl
      }
      companyName
      companyOrPerson
      homeUrl
      siteName
      siteUrl
    }
  }
`;

export const GET_PAGE = gql`
  query GetPage(
    $id: ID!
    $idType: ContentNodeIdTypeEnum!
    $asPreview: Boolean!
  ) {
    page: contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
      ... on Page {
        id
        title
        seo {
          ...SEOFragment
        }
      }
      ... on Post {
        id
        title
        seo {
          ...SEOFragment
        }
      }
      ...PageContentFragment
      ...PostContentFragment
    }
  }
  ${GET_PAGE_CONTENT_FRAGMENT}
  ${GET_POST_CONTENT_FRAGMENT}
  ${SEO_FRAGMENT}
`;

export const FORM_TO_FIELD_CONNECTION_FRAGMENT = gql`
  fragment GfFormToFormFieldConnectionFragment on GfFormToFormFieldConnection {
    edges {
      node {
        id
        type
        databaseId
        inputType
        visibility
        ... on AddressField {
          addressType
          addressValues {
            city
            country
            lineTwo
            state
            street
            zip
          }
          adminLabel
          canPrepopulate
          conditionalLogic {
            actionType
            logicType
            rules {
              fieldId
              operator
              value
            }
          }
          copyValuesOptionFieldId
          copyValuesOptionLabel
          cssClass
          databaseId
          defaultCountry
          defaultProvince
          defaultState
          description
          descriptionPlacement
          displayOnly
          errorMessage
          hasAutocomplete
          id
          inputName
          inputType
          inputs {
            autocompleteAttribute
            customLabel
            defaultValue
            id
            isHidden
            key
            label
            name
            placeholder
          }
          isRequired
          label
          labelPlacement
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          pageNumber
          personalData {
            isIdentificationField
            shouldErase
            shouldExport
          }
          shouldCopyValuesOption
          subLabelPlacement
          type
          value
          visibility
        }
        ... on NameField {
          id
          databaseId
          inputs {
            ... on NameInputProperty {
              id
              name
              autocompleteAttribute
              customLabel
              defaultValue
              hasChoiceValue
              isHidden
              key
              label
              placeholder
            }
          }
          isRequired
          type
          value
          label
        }
        ... on CheckboxField {
          id
          databaseId
          label
          isRequired
          description
          cssClass
          choices {
            isSelected
            text
            value
          }
          inputs {
            id
          }
        }
        ... on WebsiteField {
          id
          placeholder
          label
          description
          isRequired
          cssClass
          value
          databaseId
        }
        ... on PhoneField {
          id
          databaseId
          label
          description
          cssClass
          isRequired
          placeholder
          databaseId
        }
        ... on DateField {
          id
          databaseId
          label
          description
          cssClass
          isRequired
          placeholder
        }
        ... on RadioField {
          id
          databaseId
          label
          description
          cssClass
          isRequired
          choices {
            isSelected
            text
            value
          }
        }
        ... on FileUploadField {
          id
          databaseId
          databaseId
          label
          type
          description
          isRequired
          cssClass
        }
        ... on HiddenField {
          id
          databaseId
          inputType
          label
          type
          value
          displayOnly
          defaultValue
          canPrepopulate
          inputName
        }
        ... on HtmlField {
          id
          databaseId
          content
          cssClass
          displayOnly
          hasMargins
          inputType
          label
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          pageNumber
          type
          visibility
        }

        ... on SelectField {
          id
          databaseId
          label
          description
          isRequired
          defaultValue
          cssClass
          placeholder
          choices {
            text
            isSelected
            value
          }
        }

        ... on MultiSelectField {
          id
          databaseId
          label
          description
          isRequired
          cssClass
          choices {
            isSelected
            text
            value
          }
        }
        ... on PhoneField {
          id
          databaseId
          label
          placeholder
          inputType
          type
          value
          isRequired
          inputName
          defaultValue
          description
          autocompleteAttribute
          databaseId
        }
        ... on TextField {
          id
          databaseId
          value
          type
          placeholder
          databaseId
          inputName
          inputType
          isRequired
          label
          cssClass
          size
          hasAutocomplete
          description
          autocompleteAttribute
        }
        ... on TextAreaField {
          id
          databaseId
          description
          type
          size
          placeholder
          visibility
          value
          inputType
          inputName
          isRequired
          label
          cssClass
          errorMessage
          defaultValue
          databaseId
        }
        ... on CaptchaField {
          captchaBadgePosition
          captchaLanguage
          captchaTheme
          captchaType
          conditionalLogic {
            actionType
            logicType
            rules {
              fieldId
              operator
              value
            }
          }
          cssClass
          databaseId
          description
          descriptionPlacement
          displayOnly
          errorMessage
          id
          inputType
          label
          labelPlacement
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          pageNumber
          simpleCaptchaBackgroundColor
          simpleCaptchaFontColor
          simpleCaptchaSize
          type
          value
          visibility
        }
        ... on ConsentField {
          adminLabel
          checkboxLabel
          conditionalLogic {
            actionType
            logicType
            rules {
              fieldId
              operator
              value
            }
          }
          consentValue
          cssClass
          databaseId
          description
          descriptionPlacement
          displayOnly
          errorMessage
          id
          inputType
          isRequired
          label
          labelPlacement
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          pageNumber
          personalData {
            isIdentificationField
            shouldErase
            shouldExport
          }
          type
          value
          visibility
        }
        ... on EmailField {
          id
          databaseId
          value
          type
          placeholder
          label
          inputs {
            label
            id
          }
          isRequired
        }
      }
    }
  }
`;

export const GF_FORM_FRAGMENT = gql`
  ${FORM_TO_FIELD_CONNECTION_FRAGMENT}
  fragment GfFormFragment on GfForm {
    id
    confirmations {
      message
    }
    submitButton {
      text
    }
    databaseId
    title
    description
    formFields(first: 100) {
      ...GfFormToFormFieldConnectionFragment
    }
  }
`;

export const FORM_QUERY = gql`
  ${GF_FORM_FRAGMENT}
  query FormQuery($id: ID!) {
    gfForm(id: $id, idType: ID) {
      ...GfFormFragment
    }
  }
`;
