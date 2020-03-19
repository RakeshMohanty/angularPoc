import { IUser } from './user-management/_models/user.model';
import { MenuItem } from 'app/layout/navigation/menu-item.interface';
import { ProductCategory, ProductOffer } from 'app/leads/_models/leads.model';
import { ICustomer } from 'app/leads/_models/customer.model';
import { VendorCategory, VendorInformation, VendorOfferDetail } from './leads/_models/vendor.model';
import { ICustomerMessageResponse } from 'app/leads/_models/customer.model';
import { IOfferResponse } from './leads/_models/offer.model';

export interface AppState {
    user: IUser,
    menuItems: MenuItem[],
    productCategories: ProductCategory[],
    productOffers: ProductOffer[]
    customer: ICustomer,
    vendorCategories: VendorCategory[],
    vendorInformation: VendorInformation,
    offerDetail: VendorOfferDetail,
    messages: ICustomerMessageResponse[],
    offers: IOfferResponse[]
}
