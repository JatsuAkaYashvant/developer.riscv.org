/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useMemo, useEffect} from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, {translate} from '@docusaurus/Translate';
import {useHistory, useLocation} from '@docusaurus/router';
import {usePluralForm} from '@docusaurus/theme-common';

import Layout from '@theme/Layout';
import {
  sortedDevices,
  Tags,
  TagList,
  type Device,
  type TagType,
  MaintainedType,
  MaintenanceStatusList,
  MaintenanceStatuses,
} from '@site/src/data/devices';
import DeviceDirectoryTagSelect, {
  readSearchTags,
} from './_components/DeviceDirectoryTagSelect';
import DeviceDirectoryMaintenanceStatusSelect, {
  readMaintenanceStatus
} from './_components/DeviceDirectoryMaintenanceStatusSelect';
import DeviceDirectoryFilterToggle, {
  type Operator,
  readOperator,
} from './_components/DeviceDirectoryFilterToggle';
import DeviceDirectoryCard from './_components/DeviceDirectoryCard';
import DeviceDirectoryTooltip from './_components/DeviceDirectoryTooltip';

import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import DocusaurusSvg from '@site/static/img/logo.svg';
const TITLE = translate({message: 'RISC-V Device Directory'});
const DESCRIPTION = translate({
  message: 'A community-sourced list of devices in the RISC-V Ecosystem',
});
const SUBMIT_URL = 'https://github.com/riscv/developer.riscv.org/todo';

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const {scrollTopPosition, focusedElementId} = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({top: scrollTopPosition});
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterDevices(
  devices: Device[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
  selectedMaintenanceStatuses: MaintainedType[],
) {
  let filteredDevices = devices;
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    filteredDevices = filteredDevices.filter((device) =>
      device.name.toLowerCase().includes(searchName.toLowerCase())
      || device.author?.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedMaintenanceStatuses.length === 0) {
    filteredDevices = filteredDevices;
  }
  if (selectedMaintenanceStatuses.length > 0) {
    filteredDevices = filteredDevices.filter((device) => {
      if (operator === 'AND') {
        return selectedMaintenanceStatuses.every((status) => device.maintenanceStatus.includes(status));
      }
      return selectedMaintenanceStatuses.some((status) => device.maintenanceStatus.includes(status));
    });
  }
  if (selectedTags.length === 0) {
    filteredDevices = filteredDevices;
  }
  if (selectedTags.length > 0) {
    filteredDevices = devices.filter((device) => {
      if (device.tags.length === 0) {
        return false;
      }
      if (operator === 'AND') {
        return selectedTags.every((tag) => device.tags.includes(tag));
      }
      return selectedTags.some((tag) => device.tags.includes(tag));
    });
  }
  return filteredDevices;
}

function useFilteredDevices() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>('OR');
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedMaintenanceStatuses, setSelectedMaintenanceStatuses] = useState<MaintainedType[]>([]);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    setSelectedMaintenanceStatuses(readMaintenanceStatus(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterDevices(sortedDevices, selectedTags, operator, searchName, selectedMaintenanceStatuses),
    [selectedTags, operator, searchName, selectedMaintenanceStatuses],
  );
}

function DeviceDirectoryHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a
        className="button button--primary button--lg"
        href={SUBMIT_URL}
        target="_blank"
        rel="noreferrer">
          <FontAwesomeIcon icon={faPlusSquare} className={styles.buttonIcon}/>
          <Translate id="devicedirectory.header.button">
            Add a Device
          </Translate>
      </a>
    </section>
  );
}

function useDeviceCountPlural() {
  const {selectMessage} = usePluralForm();
  return (deviceCount: number) =>
    selectMessage(
      deviceCount,
      translate(
        {
          id: 'devicedirectory.filters.resultCount',
          description:
            'Pluralized label for the number of devices found in the directory. Use as many plural forms (separated by "|") as your language supports/needs (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 device|{deviceCount} devices',
        },
        {deviceCount},
      ),
    );
}

function DeviceDirectoryFilters() {
  const filteredDevices = useFilteredDevices();
  const deviceCountPlural = useDeviceCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <h2>
            <Translate id="devicedirectory.filters.title">Filters</Translate>
          </h2>
          <span>{deviceCountPlural(filteredDevices.length)}</span>
        </div>
        <DeviceDirectoryFilterToggle />
      </div>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {TagList.map((tag, i) => {
          const {label, description, color} = Tags[tag];
          const id = `devicedirectory_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <DeviceDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <DeviceDirectoryTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === 'favourite' ? (
                      <FontAwesomeIcon icon={faHeart} size="lg" className={styles.svgIconFavourite} />
                    ) : tag === 'docusaurus' ? (
                      <DocusaurusSvg className={styles.svgIconDocusaurus} />
                    ) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </DeviceDirectoryTooltip>
            </li>
          );
        })}
      </ul>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {MaintenanceStatusList.map((maintenanceStatus, i) => {
          const {label, description, icon} = MaintenanceStatuses[maintenanceStatus];
          const id = `devicedirectory_checkbox_id_${maintenanceStatus}`;
          return (
            <li key={i} className={styles.checkboxListItem}>
              <DeviceDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <DeviceDirectoryMaintenanceStatusSelect
                  maintenanceStatus={maintenanceStatus}
                  id={id}
                  label={label}
                  icon={icon}
                />
              </DeviceDirectoryTooltip>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const favouriteDevices = sortedDevices.filter(
  (device) => device.tags.includes('favourite'),
);
const otherDevices = sortedDevices.filter(
  (device) => !device.tags.includes('favourite'),
);

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder={translate({
          message: 'Search for Device or Company name',
          id: 'devicedirectory.searchBar.placeholder',
        })}
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById('searchbar')?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function DeviceDirectoryCards() {
  const filteredDevices = useFilteredDevices();

  if (filteredDevices.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>
            <Translate id="devicedirectory.usersList.noResult">No result</Translate>
          </h2>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredDevices.length === sortedDevices.length ? (
        <>
          <div className={styles.deviceDirectoryFavourite}>
            <div className="container">
              <div
                className={clsx(
                  'margin-bottom--md',
                  styles.deviceDirectoryFavouriteHeader,
                )}>
                <h2>
                  <Translate id="devicedirectory.favouritesList.title">
                    Featured Devices
                  </Translate>
                </h2>
                {/*<FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="2xl" />*/}
                <SearchBar />
              </div>
              <ul
                className={clsx(
                  'container',
                  'clean-list',
                  styles.deviceDirectoryList,
                )}>
                {favouriteDevices.map((device) => (
                  <DeviceDirectoryCard key={device.id} device={device} />
                ))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <h2 className={styles.deviceDirectoryHeader}>
              <Translate id="devicedirectory.usersList.allUsers">All devices</Translate>
            </h2>
            <ul className={clsx('clean-list', styles.deviceDirectoryList)}>
              {otherDevices.map((device) => (
                <DeviceDirectoryCard key={device.id} device={device} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx(
              'margin-bottom--md',
              styles.deviceDirectoryFavouriteHeader,
            )}>
            <SearchBar />
          </div>
          <ul className={clsx('clean-list', styles.deviceDirectoryList)}>
            {filteredDevices.map((device) => (
              <DeviceDirectoryCard key={device.id} device={device} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function DeviceDirectory(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <DeviceDirectoryHeader />
        <DeviceDirectoryFilters />
        <DeviceDirectoryCards />
      </main>
    </Layout>
  );
}
