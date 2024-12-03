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
