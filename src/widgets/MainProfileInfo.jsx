// Components
import Spring from "../components/Spring";
import Counter from "../components/Counter";
import Submenu from "../ui/Submenu";

// Hooks
import useSubmenu from "../hooks/useSubmenu";

// Assets
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const MainProfileInfo = () => {
  const { anchorEl, open, handleClose } = useSubmenu();

  // Static data for the component
  const staticData = {
    newOrders: 10,
    inProgressOrders: 5,
    completedOrders: 20,
    canceledOrders: 2,
    totalProducts: 100,
    totalOrders: 37,
    totalUsers: 15,
  };

  // Render a badge item with a counter
  const BadgeItem = ({ color, icon, count, label }) => (
    <div className="flex gap-3" style={{ width: "100%" }}>
      <div className={`badge-icon ${color}`}>
        <i className={`${icon} text-[23px] mt-1`} />
      </div>
      <div>
        <Counter
          className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
          num={count}
        />
        <span className="block label-text mb-2">{label}</span>
      </div>
    </div>
  );

  return (
    <Spring className="card flex flex-col gap-4 md:flex-row md:gap-[26px] lg:col-span-3 xl:col-span-2 2xl:col-span-1">
      {/* Logo Section */}
      <div
        className="h-[230px] rounded-md bg-body border border-input-border p-5 flex flex-col items-center
        justify-center gap-6 shrink-0 md:w-[190px]"
      >
        <img
          className="h-20 w-auto ml-2.5"
          style={{ objectFit: "contain" }}
          src={logo}
          alt="CarFixIT"
        />
      </div>

      {/* Profile Info Section */}
      <div className="flex flex-1 flex-col gap-8">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3>CarFixIT</h3>
        </div>

        {/* Badge Grid */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between">
            <BadgeItem
              color="bg-yellow"
              icon="icon-diamond"
              count={staticData.newOrders}
              label="New Orders"
            />
            <BadgeItem
              color="bg-accent"
              icon="icon-diamond"
              count={staticData.inProgressOrders}
              label="In Progress Orders"
            />
            <BadgeItem
              color="bg-green"
              icon="icon-diamond"
              count={staticData.completedOrders}
              label="Completed Orders"
            />
            <BadgeItem
              color="bg-red"
              icon="icon-layer-group-regular"
              count={staticData.canceledOrders}
              label="Canceled Orders"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between">
            <BadgeItem
              color="bg-green"
              icon="icon-boxes-stacked-regular"
              count={staticData.totalProducts}
              label="Products"
            />
            <BadgeItem
              color="bg-accent"
              icon="icon-plus-regular"
              count={staticData.totalOrders}
              label="Total Orders"
            />
            <BadgeItem
              color="bg-accent"
              icon="icon-user-solid"
              count={staticData.totalUsers}
              label="Users"
            />
            <BadgeItem
            color="bg-accent"
            icon="icon-user-solid"
            count={staticData.totalUsers}
            label="Users"
          />
          </div>
        </div>
      </div>

      {/* Submenu */}
      <Submenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="flex flex-col items-start gap-5 p-5">
          <NavLink className="menu-btn subheading-2" to="/seller-profile">
            <span className="icon-wrapper">
              <i className="icon icon-chart-pie-solid" />
            </span>
            View Profile
          </NavLink>
          <button className="menu-btn subheading-2">
            <span className="icon-wrapper">
              <i className="icon icon-link-solid" />
            </span>
            Contacts
          </button>
          <button className="menu-btn subheading-2">
            <span className="icon-wrapper">
              <i className="icon icon-share-solid" />
            </span>
            Share
          </button>
        </div>
      </Submenu>
    </Spring>
  );
};

export default MainProfileInfo;
