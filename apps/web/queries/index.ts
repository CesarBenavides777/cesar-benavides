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

export const GET_PAGE_CONTENT_FRAGMENT = gql`
  fragment PageContentFragment on Page {
    pageContent {
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
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;

export const GET_PAGE = gql`
  query GetPage($id: ID!, $idType: PageIdType!, $asPreview: Boolean!) {
    page(id: $id, idType: $idType, asPreview: $asPreview) {
      id
      title
      ...PageContentFragment
    }
  }
  ${GET_PAGE_CONTENT_FRAGMENT}
`;
