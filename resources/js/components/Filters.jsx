import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Components
import { Container } from "./";

// Helpers
import { classNames } from "../helpers";

// Config
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const Filters = ({ filters, addFilter, removeFilter }) => {
  return (
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>

      <div className="border-b border-gray-200 bg-white pb-4">
        <Container className="flex items-center justify-between">
          <SortMenu />
          <FilterMenu
            filters={filters}
            addFilter={addFilter}
            removeFilter={removeFilter}
          />
        </Container>
      </div>

      {/* Active filters */}
      <div className="bg-gray-100">
        <Container>
          <ActiveFilters filters={filters} removeFilter={removeFilter} />
        </Container>
      </div>
    </section>
  );
};

export default Filters;

const SortMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    href={option.href}
                    className={classNames(
                      option.current
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const FilterMenu = ({ filters, addFilter, removeFilter }) => {
  return (
    <>
      <button
        type="button"
        className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        Filters
      </button>

      <div className="hidden sm:block">
        <div className="flow-root">
          <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
            {filters.map((filter) => (
              <Popover
                key={filter.name}
                className="relative inline-block px-4 text-left"
              >
                <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{filter.name}</span>
                  {filter.options.some((option) => option.active) ? (
                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                      {filter.options.filter((option) => option.active).length}
                    </span>
                  ) : null}
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <FilterOptions
                      filter={filter}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                    />
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </Popover.Group>
        </div>
      </div>
    </>
  );
};

const FilterOptions = ({ filter, addFilter, removeFilter }) => {
  const { name, options } = filter;
  return (
    <div className="space-y-4">
      {options.map(
        ({ value, count, active }) =>
          count > 0 && (
            <div key={value} className="flex items-center">
              <input
                name={value}
                id={`filter-${name}-${value}`}
                type="checkbox"
                onChange={() => {
                  !active ? addFilter(name, value) : removeFilter(name, value);
                }}
                checked={active}
                disabled={!active && 0 === count}
                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <label
                htmlFor={`filter-${name}-${value}`}
                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
              >
                {value}
                <span className="opacity-50 text-xs ml-2">{`(${count})`}</span>
              </label>
            </div>
          )
      )}
    </div>
  );
};

const ActiveFilters = ({ filters, removeFilter }) => {
  const activeFilters = filters.reduce((acc, cur) => {
    const filterName = cur.name;
    const activeOptions = cur.options
      .filter((option) => option.active && option.count > 0)
      .map((option) => ({ name: filterName, value: option.value }));

    acc = [...acc, ...activeOptions];

    return acc;
  }, []);

  return (
    <div className="py-3 sm:flex sm:items-center">
      <h3 className="text-sm font-medium text-gray-500">
        Filters
        <span className="sr-only">, active</span>
      </h3>

      <div
        aria-hidden="true"
        className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
      />

      <div className="mt-2 sm:ml-4 sm:mt-0">
        <div className="-m-1 flex flex-wrap items-center">
          {activeFilters &&
            activeFilters.map((activeFilter) => (
              <span
                key={activeFilter.value}
                className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
              >
                <span className="text-gray-500 font-light mr-1">{`${activeFilter.name}:`}</span>
                <span>{activeFilter.value}</span>
                <button
                  type="button"
                  className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  onClick={() =>
                    removeFilter(activeFilter.name, activeFilter.value)
                  }
                >
                  <span className="sr-only">
                    Remove filter for {activeFilter.value}
                  </span>
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
