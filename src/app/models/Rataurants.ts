import { Address } from './Address';
import { Menu } from './Menu';

export interface Restaurants {
    [x: string]: any;
    id?: string;
    name?: string;
    phone_number?: string;
    email?: string;
    delivery?: boolean;
    logo?: string;
    image_cover?: string;
    created_at?: string;
    updated_at?: string;
    address?: Address;
    menu?: Menu[];
    user?: string;
}
