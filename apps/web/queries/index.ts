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
        # Form Block
        ... on PageContentBlocksFormblockLayout {
          gravityformid
          showTitle
          showDescription
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

export const FORM_TO_FIELD_CONNECTION_FRAGMENT = gql`
  fragment GfFormToFormFieldConnectionFragment on GfFormToFormFieldConnection {
    edges {
      node {
        id
        type
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
          autocompleteAttribute
        }
        ... on TextAreaField {
          id
          databaseId
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
    formFields {
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
