
// Form field context to fix fast refresh warning by extracting into separate file
import * as React from "react"
import { FormItemContextValue, FormFieldContextValue } from "./form-types"

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)
