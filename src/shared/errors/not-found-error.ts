import { NotFoundException } from '@nestjs/common';

export type NotFoundResource =
  | 'Address'
  | 'Category'
  | 'City'
  | 'CityArea'
  | 'Company'
  | 'Country'
  | 'ExpertiseCategory'
  | 'ExpertiseInfo'
  | 'ExpertiseSubCategory'
  | 'RelatedPage'
  | 'RequestForQuote'
  | 'RequestQuote'
  | 'RequestQuoteForm'
  | 'Review'
  | 'SubMenu'
  | 'User'
  | 'UserPayment'
  | 'Wallet'
  | 'SupportMessage'
  | 'RequestForQuotePendingPurchase';

// const dictionary: Record<Lang, Record<NotFoundResource, string>> = {
const dictionary: Record<NotFoundResource, string> = {
  // en: {
  Address: 'Address not found.',
  Category: 'Category not found.',
  City: 'City not found.',
  CityArea: 'City area not found.',
  Company: 'Company not found.',
  Country: 'Country not found.',
  ExpertiseCategory: 'Expertise category not found.',
  ExpertiseInfo: 'Expertise info not found.',
  ExpertiseSubCategory: 'Expertise sub category not found.',
  RelatedPage: 'Related page not found.',
  RequestForQuote: 'Request for quote not found.',
  RequestQuote: 'Request quote not found.',
  RequestQuoteForm: 'Request quote form not found.',
  Review: 'Review not found.',
  SubMenu: 'Submenu not found.',
  User: 'User not found.',
  UserPayment: 'User payment not found.',
  Wallet: 'Wallet not found.',
  SupportMessage: 'Support message not found.',
  RequestForQuotePendingPurchase:
    'Request for quote pending purchase not found.',
  // },
  // nl: {
  //   Address: 'Adres niet gevonden.',
  //   Category: 'Categorie niet gevonden.',
  //   City: 'Stad niet gevonden.',
  //   CityArea: 'Stadsgebied niet gevonden.',
  //   Company: 'Bedrijf niet gevonden.',
  //   Country: 'Land niet gevonden.',
  //   ExpertiseCategory: 'Expertisecategorie niet gevonden.',
  //   ExpertiseInfo: 'Expertise-informatie niet gevonden.',
  //   ExpertiseSubCategory: 'Expertisesubcategorie niet gevonden.',
  //   RelatedPage: 'Gerelateerde pagina niet gevonden.',
  //   RequestForQuote: 'Offerteaanvraag niet gevonden.',
  //   RequestQuote: 'Offerte niet gevonden.',
  //   RequestQuoteForm: 'Offerteaanvraagformulier niet gevonden.',
  //   Review: 'Beoordeling niet gevonden.',
  //   SubMenu: 'Submenu niet gevonden.',
  //   User: 'Gebruiker niet gevonden.',
  //   UserPayment: 'Gebruikersbetaling niet gevonden.',
  //   Wallet: 'Portemonnee niet gevonden.',
  //   SupportMessage: 'Ondersteuningsbericht niet gevonden.',
  //   RequestForQuotePendingPurchase:
  //     'Offerteaanvraag wachtend op aankoop niet gevonden.',
  // },
};
export class NotFoundError extends NotFoundException {
  readonly _tag = 'NotFoundError';

  private constructor(
    private readonly resource: NotFoundResource,
    private readonly e?: unknown,
  ) {
    super(dictionary[resource], {
      cause: e,
      description: resource,
    });
  }

  static mk(resource: NotFoundResource, e?: unknown) {
    return new NotFoundError(resource, e);
  }

  toString() {
    return dictionary[this.resource];
  }
}
