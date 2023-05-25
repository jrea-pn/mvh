import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Components
import { Container } from "./";

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
      <div className="bg-gray-400">
        <Container className="flex items-center justify-between py-4">
          filters
        </Container>
      </div>
    </section>
  );
};

export default Filters;

const SortMenu = () => {
  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];

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

const activeFilters = [{ value: "objects", label: "Objects" }];

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
            {filters.map((filter, filterIdx) => (
              <Popover
                key={filter.name}
                className="relative inline-block px-4 text-left"
              >
                <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{filter.name}</span>
                  {filterIdx === 0 ? (
                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                      1
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
            <label key={value} className="block py-0">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={value}
                  id={1}
                  onChange={() => {
                    !active
                      ? addFilter(name, value)
                      : removeFilter(name, value);
                  }}
                  checked={active}
                  disabled={!active && 0 === count}
                  className="h-3 w-3 rounded border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
                />
                <div className="">
                  {value}
                  <span className="text-gray-500 text-xs ml-2">{`(${count})`}</span>
                </div>
              </div>
            </label>
          )
      )}
    </div>
  );
};
