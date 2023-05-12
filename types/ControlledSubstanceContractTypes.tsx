export interface ControlledSubstanceContractTypes {
  name: string
  email: string
  dateOfBirth: string
  phone: string
  controlledSubstances: Array<string>
  pharmacyName: string
  crossStreets: string
  checkboxes: Array<string>
  patientSignature: string
  patientSignatureDate: string
  agreeThatTheirSignatureIsValid: boolean
}
