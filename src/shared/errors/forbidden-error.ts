import { ForbiddenException } from '@nestjs/common';

type Resource =
  | 'AccessFile'
  | 'AccessibleClient'
  | 'AccessibleSellerRegistrationRequest'
  | 'AccessibleTicket'
  | 'AccessProductGroup'
  | 'AccessShippingAddress'
  | 'AssignUserPermission'
  | 'AtLeastBusinessSubCategoryRequired'
  | 'CurrentSession'
  | 'EmailExist'
  | 'MobileExist'
  | 'MatchPassword'
  | 'MismatchConfirmPassword'
  | 'NoUser'
  | 'NoUserid'
  | 'NoEmail'
  | 'MismatchOldPassword'
  | 'MismatchOtp'
  | 'MismatchPasswordOrEmail'
  | 'OTPAlreadyHasBeenSent'
  | 'ProductGroupInUsed'
  | 'ProductIsDisable'
  | 'ProductIsNotConfirmed'
  | 'ProductIsNotPending'
  | 'SufficientPermission'
  | 'TicketAlreadyClose'
  | 'TicketAlreadyOpen'
  | 'TicketChatsNotFound'
  | 'TicketMustAssignToUsers'
  | 'TicketUserIdRequired'
  | 'TopicNotChoice'
  | 'UploadPrivate'
  | 'VerificationCodeWasNotSent'
  | 'VerifyYourEmailFirst'
  | 'AcceptQuoteIsNotPending'
  | 'QuoteIsNotPending'
  | 'RejectQuoteIsNotPending'
  | 'ExpertiseCategoryNotActive'
  | 'ExpertiseCategoryNotInActive'
  | 'ExpertiseSubCategoryNotActive'
  | 'ExpertiseSubCategoryNotInActive'
  | 'RequestQuoteFormFields'
  | 'RequestForQuotePurchasedYet'
  | 'RequestForQuoteNotAvailable'
  | 'RequestForQuoteAlreadyApproved'
  | 'RequestForQuoteAlreadyRejected'
  | 'RequestQuoteNotAvailable'
  | 'InsufficientWalletBalance'
  | 'UserPaymentAlreadyDone'
  | 'UserPaymentExpired'
  | 'EmailNotFound'
  | 'InvalidTokenOrEmail';

const dictionary: Record<Resource, string> = {
  // en: {
  AccessFile: "You don't have access to this file.",
  AccessibleClient: "You don't have access to this client.",
  AccessibleSellerRegistrationRequest:
    "You don't have access to this registration request.",
  AccessibleTicket: "You don't have access to this ticket.",
  AccessProductGroup: "You don't have access to this product group.",
  AccessShippingAddress: "You don't have access to this shipping address",
  AssignUserPermission: 'Insufficient permissions to assign user permissions.',
  AtLeastBusinessSubCategoryRequired:
    'At least one business sub-category is required.',
  CurrentSession: "You can't terminate the current session.",
  EmailExist: 'This email already exists.',
  MobileExist: 'This mobile already exists.',
  MatchPassword: 'New password must be different from the old password.',
  MismatchConfirmPassword: 'Passwords do not match.',
  NoUser: 'No user found.',
  NoUserid: 'No user id found.',
  NoEmail: 'No email found.',
  MismatchOldPassword: 'Incorrect old password.',
  MismatchOtp: 'Invalid OTP code.',
  MismatchPasswordOrEmail: 'Invalid password or email.',
  InvalidTokenOrEmail: 'Invalid token or email.',
  OTPAlreadyHasBeenSent: 'An OTP code already has been sent.',
  ProductGroupInUsed: 'This product group is currently in use.',
  ProductIsDisable: 'This product is disabled.',
  ProductIsNotConfirmed: 'This product is not confirmed.',
  ProductIsNotPending: 'This product is not in pending status.',
  SufficientPermission: 'Insufficient permissions to perform this action.',
  TicketAlreadyClose: 'This ticket is already closed.',
  TicketAlreadyOpen: 'This ticket is already open.',
  TicketChatsNotFound: 'No chats found for this ticket.',
  TicketMustAssignToUsers: 'Ticket must be assigned to valid users.',
  TicketUserIdRequired: 'User ID is required for the ticket.',
  TopicNotChoice: 'Please select a topic.',
  UploadPrivate: "You don't have permission to upload private files.",
  VerificationCodeWasNotSent: 'Verification code has not been sent.',
  VerifyYourEmailFirst: 'Please verify your email first.',
  QuoteIsNotPending: 'Quote is not pending.',
  AcceptQuoteIsNotPending: 'Only pending quotes can be accepted.',
  RejectQuoteIsNotPending: 'Only pending quotes can be rejected.',
  ExpertiseCategoryNotActive: 'Expertise category is not active.',
  ExpertiseCategoryNotInActive: 'Expertise category is not in-active.',
  ExpertiseSubCategoryNotActive: 'Expertise subcategory is not active.',
  ExpertiseSubCategoryNotInActive: 'Expertise subcategory is not in-active.',
  RequestQuoteFormFields: 'Request quote form fields required.',
  RequestForQuotePurchasedYet: 'Request for quote purchased yet.',
  RequestForQuoteNotAvailable: 'Request for quote not available.',
  RequestForQuoteAlreadyApproved: 'Request for quote already approved.',
  RequestForQuoteAlreadyRejected: 'Request for quote already rejected.',
  RequestQuoteNotAvailable: 'Request quote not available',
  InsufficientWalletBalance: 'Insufficient wallet balance.',
  UserPaymentAlreadyDone: 'User payment already done.',
  UserPaymentExpired: 'User payment expired.',
  EmailNotFound: 'This email address was not found.',
  // },
  // nl: {
  //   AccessFile: 'U heeft geen toegang tot dit bestand.',
  //   AccessibleClient: 'U heeft geen toegang tot deze klant.',
  //   AccessibleSellerRegistrationRequest:
  //     'U heeft geen toegang tot dit registratieverzoek.',
  //   AccessibleTicket: 'U heeft geen toegang tot dit ticket.',
  //   AccessProductGroup: 'U heeft geen toegang tot deze productgroep.',
  //   AccessShippingAddress: 'U heeft geen toegang tot dit verzendadres',
  //   AssignUserPermission:
  //     'Onvoldoende rechten om gebruikersrechten toe te wijzen.',
  //   AtLeastBusinessSubCategoryRequired:
  //     'Tenminste één bedrijfssubcategorie is vereist.',
  //   CurrentSession: 'U kunt de huidige sessie niet beëindigen.',
  //   EmailExist: 'Het e-mailadres bestaat al.',
  //   MobileExist: 'Deze mobiele telefoon bestaat al.',
  //   MatchPassword: 'Nieuw wachtwoord moet verschillen van het oude wachtwoord.',
  //   MismatchConfirmPassword: 'Wachtwoorden komen niet overeen-2.',
  //   NoUser: 'Geen gebruiker gevonden.',
  //   NoUserid: 'Geen gebruikers-id gevonden.',
  //   NoEmail: 'Geen e-mail gevonden.',
  //   MismatchOldPassword: 'Onjuist oud wachtwoord.',
  //   MismatchOtp: 'Ongeldige OTP-code.',
  //   MismatchPasswordOrEmail: 'Ongeldig wachtwoord of e-mailadres.',
  //   InvalidTokenOrEmail: 'Ongeldig token of e-mailadres.',
  //   OTPAlreadyHasBeenSent: 'Er is al een OTP-code verzonden.',
  //   ProductGroupInUsed: 'Deze productgroep is momenteel in gebruik.',
  //   ProductIsDisable: 'Dit product is uitgeschakeld.',
  //   ProductIsNotConfirmed: 'Dit product is niet bevestigd.',
  //   ProductIsNotPending: 'Dit product heeft geen status in behandeling.',
  //   SufficientPermission: 'Onvoldoende rechten om deze actie uit te voeren.',
  //   TicketAlreadyClose: 'Dit ticket is al gesloten.',
  //   TicketAlreadyOpen: 'Dit ticket is al open.',
  //   TicketChatsNotFound: 'Geen chats gevonden voor dit ticket.',
  //   TicketMustAssignToUsers:
  //     'Ticket moet worden toegewezen aan geldige gebruikers.',
  //   TicketUserIdRequired: 'Gebruikers-ID is vereist voor het ticket.',
  //   TopicNotChoice: 'Selecteer een onderwerp.',
  //   UploadPrivate: 'U heeft geen toestemming om privébestanden te uploaden.',
  //   VerificationCodeWasNotSent: 'Verificatiecode is niet verzonden.',
  //   VerifyYourEmailFirst: 'Verifieer eerst uw e-mailadres.',
  //   QuoteIsNotPending: 'Offerte is niet in behandeling.',
  //   AcceptQuoteIsNotPending:
  //     'Alleen offertes in behandeling kunnen worden geaccepteerd.',
  //   RejectQuoteIsNotPending:
  //     'Alleen offertes in behandeling kunnen worden afgewezen.',
  //   ExpertiseCategoryNotActive: 'Expertisecategorie is niet actief.',
  //   ExpertiseCategoryNotInActive: 'Expertisecategorie is niet inactief.',
  //   ExpertiseSubCategoryNotActive: 'Expertisesubcategorie is niet actief.',
  //   ExpertiseSubCategoryNotInActive: 'Expertisesubcategorie is niet inactief.',
  //   RequestQuoteFormFields: 'Offerteaanvraagformulier velden zijn vereist.',
  //   RequestForQuotePurchasedYet: 'Offerteaanvraag is al aangeschaft.',
  //   RequestForQuoteNotAvailable: 'Offerteaanvraag is niet beschikbaar.',
  //   RequestForQuoteAlreadyApproved: 'Offerteaanvraag is al goedgekeurd.',
  //   RequestForQuoteAlreadyRejected: 'Offerteaanvraag is al afgewezen.',
  //   RequestQuoteNotAvailable: 'Offerteaanvraag is niet beschikbaar',
  //   InsufficientWalletBalance: 'Onvoldoende saldo in portemonnee.',
  //   UserPaymentAlreadyDone: 'Gebruikersbetaling is al gedaan.',
  //   UserPaymentExpired: 'Gebruikersbetaling is verlopen.',
  //   EmailNotFound: 'Het e-mailadres is niet gevonden.',
  // },
};

export class ForbiddenError extends ForbiddenException {
  readonly _tag = 'ForbiddenError';

  private constructor(
    private readonly resource: Resource,
    private readonly originalError?: unknown,
  ) {
    super(dictionary[resource], {
      cause: originalError,
      description: resource,
    });
  }

  static mk(resource: Resource, originalError?: unknown): ForbiddenError {
    return new ForbiddenError(resource, originalError);
  }

  getLocalizedMessage(): string {
    return dictionary[this.resource] || `Forbidden: ${this.resource}`; // Fallback message if resource not found'';
  }

  toString(): string {
    return this.getLocalizedMessage();
  }

  getOriginalError(): unknown {
    return this.originalError;
  }
}
