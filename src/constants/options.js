import eng from "../assets/flags/eng.webp";
import de from "../assets/flags/de.webp";
import dk from "../assets/flags/dk.webp";
import ua from "../assets/flags/ua.webp";
import mc from "../assets/payment/mc.svg";
import visa from "../assets/payment/visa.svg";
import googlepay from "../assets/payment/googlepay.svg";
import applepay from "../assets/payment/applepay.svg";
import paypal from "../assets/payment/paypal.svg";
import bitpay from "../assets/payment/bitpay.svg";

export const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Category 1", value: "category1" },
  { label: "Category 2", value: "category2" },
];

export const BRAND_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Category 1", value: "category1" },
  { label: "Category 2", value: "category2" },
];

export const PRODUCT_CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "btteries", label: "Batteries" },
  { value: "engineOil", label: "Engine Oil diesel" },
  { value: "engineOilPetrol", label: "Engine Oil Petrol" },

  { value: "Filters", label: "Filters" },
  { value: "Oils", label: "Oils" },
  { value: "Tyres", label: "Tyres" },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: "best-selling", label: "Best Selling" },
  { value: "available", label: "Available" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
];
export const PRODUCT_SORT_ORDER_CATEGORY = [
  { value: "default", label: "Default" },
  { value: "pending", label: "New" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Cancelled" },
  { value: "assigned", label: "Assigned" },
];

export const SELLER_SORT_OPTIONS = [
  { value: "best-selling", label: "Best Selling" },
  { value: "rating-high-to-low", label: "Rating: High to Low" },
  { value: "rating-low-to-high", label: "Rating: Low to High" },
  { value: "a-z", label: "By name: A-Z" },
  { value: "z-a", label: "By name: Z-A" },
];

export const REVIEW_SORT_OPTIONS = [
  { value: "recent", label: "Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "rating-high-to-low", label: "Highest Rating" },
  { value: "rating-low-to-high", label: "Lowest Rating" },
];

export const LOCALES = [
  { value: "en-EN", label: "English (EN)", icon: eng },
  { value: "de-DE", label: "Deutsch (DE)", icon: de },
  { value: "dk-DK", label: "Dansk (DK)", icon: dk },
  { value: "ua-UA", label: "Українська (UA)", icon: ua },
];

export const APPS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "development", label: "Developer Tools" },
  { value: "marketplace", label: "Marketplace" },
  { value: "finances", label: "Financial Accounting" },
];

export const PRODUCT_MANAGEMENT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "publish", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "trash", label: "Trash" },
];

export const ORDER_SORT_OPTIONS = [
  { value: "default", label: "Default sorting" },
  { value: "a-z", label: "By name: A-Z" },
  { value: "z-a", label: "By name: Z-A" },
  { value: "rating-high-to-low", label: "Rating: High to Low" },
  { value: "rating-low-to-high", label: "Rating: Low to High" },
];

export const PAYMENT_OPTIONS = [
  { value: "mastercard", icon: mc },
  { value: "visa", icon: visa },
  { value: "googlepay", icon: googlepay },
  { value: "applepay", icon: applepay },
  { value: "paypal", icon: paypal },
  { value: "bitpay", icon: bitpay },
];

export const NOTIFICATION_OPTIONS = [
  { value: "all", label: "All" },
  { value: "follow", label: "Following" },
  { value: "order", label: "Orders" },
];

export const MESSAGE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "latest", label: "Latest" },
  { value: "archived", label: "Archive" },
];

export const STOCK_STATUS_OPTIONS = [
  { value: "in-stock", label: "In Stock" },
  { value: "low-inventory", label: "Low Inventory" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "on-demand", label: "On Demand" },
  { value: "unavailable", label: "Temporarily Unavailable" },
];

export const PRODUCT_TYPE_OPTIONS = [
  { value: "simple", label: "Simple Product" },
  { value: "variable", label: "Variable Product" },
  { value: "grouped", label: "Grouped Product" },
  { value: "service", label: "Services Product" },
];

export const TRANSACTIONS_SORT_OPTIONS = [
  { value: "recent", label: "Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "amount-high-to-low", label: "Amount: High to Low" },
  { value: "amount-low-to-high", label: "Amount: Low to High" },
];

export const PRODUCT_SELLER_OPTIONS = [
  { value: "best-seller", label: "Best Seller" },
  { value: "new-seller", label: "New Seller" },
  { value: "top-rated", label: "Top Rated" },
  { value: "featured-seller", label: "Featured Seller" },
];

export const PRODUCT_ADDITIONAL_OPTIONS = [
  { value: "last-modified", label: "Last Modified" },
  { value: "date-added", label: "Date Added" },
  { value: "last-viewed", label: "Last Viewed" },
  { value: "average-rating", label: "Average Rating" },
  { value: "popularity", label: "Popularity" },
];

export const PRODUCT_SELECT_OPTIONS = [
  { value: "to-draft", label: "Move to Drafts" },
  { value: "to-trash", label: "Move to Trash" },
  { value: "delete", label: "Delete Permanently" },
];

export const PROMOTIONAL_OPTIONS = [
  { value: "category-1", label: "Category 1" },
  { value: "category-2", label: "Category 2" },
  { value: "category-3", label: "Category 3" },
  { value: "category-4", label: "Category 4" },
  { value: "category-5", label: "Category 5" },
];

export const UNITS_OPTIONS = [
  { value: "pcs", label: "Pieces" },
  { value: "box", label: "Boxes" },
  { value: "kg", label: "Kilograms" },
];


export const DISCOUNT_SORT_OPTIONS = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Value: High to Low', value: 'value-high-to-low' },
  { label: 'Value: Low to High', value: 'value-low-to-high' },
];
