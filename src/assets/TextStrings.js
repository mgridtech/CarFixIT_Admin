const englishString = {
  // Existing translations
  carsManagementNavTxt: "Cars Management",
  CategoryManagementNavTxt: "Category Management",

  productsManagementNavTxt: "Products Management",
  ordersNavTxt: "Orders",
  bannersNavTxt: "Banners",
  reviewsNavTxt: "Reviews",
  customersNavTxt: "Customers",
  employeeNavTxt: "Employee",
  statisticsNavTxt: "Statistics",
  transactionsNavTxt: "Transactions",
  fromDate: "From Date",
  toDate: "To Date",
  today: "Today",
  thisWeek: "This Week",
  thisMonth: "This Month",
  thisYear: "This Year",
};

const arabicString = {
  // Existing translations
  carsManagementNavTxt: "إدارة السيارات",
  productsManagementNavTxt: "إدارة المنتجات",
  ordersNavTxt: "الطلبات",
  bannersNavTxt: "اللافتات",
  reviewsNavTxt: "المراجعات",
  customersNavTxt: "العملاء",
  employeeNavTxt: "الموظفون",
  statisticsNavTxt: "الإحصائيات",
  transactionsNavTxt: "المعاملات",
  fromDate: "من تاريخ",
  toDate: "إلى تاريخ",
  today: "اليوم",
  thisWeek: "هذا الأسبوع",
  thisMonth: "هذا الشهر",
  thisYear: "هذا العام",
};

const getTextString = (isArabic) => (isArabic ? arabicString : englishString);

export { getTextString, englishString, arabicString };
