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
  sortedDesigns,
  Tags,
  TagList,
  type Design,
  type TagType,
  MaintainedType,
  MaintenanceStatusList,
  MaintenanceStatuses,
  ProfileType,
  ProfileList,
  Profiles,
} from '@site/src/data/designs';
import DesignDirectoryTagSelect, {
  readSearchTags,
} from './_components/DesignDirectoryTagSelect';
import DesignDirectoryMaintenanceStatusSelect, {
  readMaintenanceStatus
} from './_components/DesignDirectoryMaintenanceStatusSelect';
import DesignDirectoryProfileSelect, {
  readProfile
} from './_components/DesignDirectoryProfileSelect';
import DesignDirectoryFilterToggle, {
  type Operator,
  readOperator,
} from './_components/DesignDirectoryFilterToggle';
import DesignDirectoryCard from './_components/DesignDirectoryCard';
import DesignDirectoryTooltip from './_components/DesignDirectoryTooltip';

import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import DocusaurusSvg from '@site/static/img/logo.svg';
const TITLE = translate({message: 'RISC-V Design Directory'});
const DESCRIPTION = translate({
  message: 'A community-sourced list of RISC-V chip designs.',
});
const SUBMIT_URL = 'https://github.com/riscv/developer.riscv.org/wiki/Boards-Directory';

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

function filterDesigns(
  design: Design[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
  selectedMaintenanceStatuses: MaintainedType[],
  selectedProfiles: ProfileType[],
) {
  let filteredDesigns = design;
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    filteredDesigns = filteredDesigns.filter((design) =>
      design.name.toLowerCase().includes(searchName.toLowerCase())
      || design.author?.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedMaintenanceStatuses.length === 0) {
    filteredDesigns = filteredDesigns;
  }
  if (selectedMaintenanceStatuses.length > 0) {
    filteredDesigns = filteredDesigns.filter((design) => {
      if (operator === 'AND') {
        return selectedMaintenanceStatuses.every((status) => design.maintenanceStatus.includes(status));
      }
      return selectedMaintenanceStatuses.some((status) => design.maintenanceStatus.includes(status));
    });
  }
  if (selectedProfiles.length === 0) {
    filteredDesigns = filteredDesigns;
  }
  if (selectedProfiles.length > 0) {
    filteredDesigns = filteredDesigns.filter((design) => {
      if (operator === 'AND') {
        return selectedProfiles.every((status) => design.profile.includes(status));
      }
      return selectedProfiles.some((status) => design.profile.includes(status));
    });
  }
  if (selectedTags.length === 0) {
    filteredDesigns = filteredDesigns;
  }
  if (selectedTags.length > 0) {
    filteredDesigns = design.filter((design) => {
      if (design.tags.length === 0) {
        return false;
      }
      if (operator === 'AND') {
        return selectedTags.every((tag) => design.tags.includes(tag));
      }
      return selectedTags.some((tag) => design.tags.includes(tag));
    });
  }
  return filteredDesigns;
}

function useFilteredDesigns() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>('OR');
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  const [selectedMaintenanceStatuses, setSelectedMaintenanceStatuses] = useState<MaintainedType[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<ProfileType[]>([]);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    setSelectedMaintenanceStatuses(readMaintenanceStatus(location.search));
    setSelectedProfiles(readProfile(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterDesigns(sortedDesigns, selectedTags, operator, searchName, selectedMaintenanceStatuses,selectedProfiles),
    [selectedTags, operator, searchName, selectedMaintenanceStatuses, selectedProfiles],
  );
}

function DesignDirectoryHeader() {
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
          <Translate id="designdirectory.header.button">
            Add a Chip Design
          </Translate>
      </a>
    </section>
  );
}

function useDesignCountPlural() {
  const {selectMessage} = usePluralForm();
  return (designCount: number) =>
    selectMessage(
      designCount,
      translate(
        {
          id: 'designdirectory.filters.resultCount',
          description:
            'Pluralized label for the number of designs found in the directory. Use as many plural forms (separated by "|") as your language supports/needs (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 design|{designCount} designs',
        },
        {designCount},
      ),
    );
}

function DesignDirectoryFilters() {
  const filteredDesigns = useFilteredDesigns();
  const designCountPlural = useDesignCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <h2>
            <Translate id="designdirectory.filters.title">Filters</Translate>
          </h2>
          <span>{designCountPlural(filteredDesigns.length)}</span>
        </div>
        <DesignDirectoryFilterToggle />
      </div>
      <ul className={clsx('clean-list', styles.checkboxList)}>
        {TagList.map((tag, i) => {
          const {label, description, color} = Tags[tag];
          const id = `designdirectory_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <DesignDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <DesignDirectoryTagSelect
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
              </DesignDirectoryTooltip>
            </li>
          );
        })}
      </ul>
      {/*Maintained / Unmaintained tags - uncomment to add back*/}
      {/*<ul className={clsx('clean-list', styles.checkboxList)}>
        {MaintenanceStatusList.map((maintenanceStatus, i) => {
          const {label, description, icon} = MaintenanceStatuses[maintenanceStatus];
          const id = `designdirectory_checkbox_id_${maintenanceStatus}`;
          return (
            <li key={i} className={styles.checkboxListItem}>
              <DesignDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <DesignDirectoryMaintenanceStatusSelect
                  maintenanceStatus={maintenanceStatus}
                  id={id}
                  label={label}
                  icon={icon}
                />
              </DesignDirectoryTooltip>
            </li>
          );
        })}
      </ul>*/}
      {/*Profile Tags - currently breaking, so removing*/}
      {/*<ul className={clsx('clean-list', styles.checkboxList)}>
        {ProfileList.map((profile, i) => {
          const {label, description, icon} = Profiles[profile];
          const id = `designdirectory_checkbox_id_${profile}`;
          return (
            <li key={i} className={styles.checkboxListItem}>
              <DesignDirectoryTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus">
                <DesignDirectoryProfileSelect
                  profile={profile}
                  id={id}
                  label={label}
                  icon={icon}
                />
              </DesignDirectoryTooltip>
            </li>
          );
        })}
      </ul>*/}
    </section>
  );
}

const favouriteDesigns = sortedDesigns.filter(
  (design) => design.tags.includes('favourite'),
);
const otherDesigns = sortedDesigns.filter(
  (design) => !design.tags.includes('favourite'),
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
          message: 'Search for Design or Company name',
          id: 'designdirectory.searchBar.placeholder',
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

function DesignDirectoryCards() {
  const filteredDesigns = useFilteredDesigns();

  if (filteredDesigns.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>
            <Translate id="designdirectory.usersList.noResult">No result</Translate>
          </h2>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredDesigns.length === sortedDesigns.length ? (
        <>
          <div className={styles.designDirectoryFavourite}>
            <div className="container">
              <div
                className={clsx(
                  'margin-bottom--md',
                  styles.designDirectoryFavouriteHeader,
                )}>
                <h2>
                  <Translate id="designdirectory.favouritesList.title">
                    Featured Designs
                  </Translate>
                </h2>
                {/*<FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="2xl" />*/}
                <SearchBar />
              </div>
              <ul
                className={clsx(
                  'container',
                  'clean-list',
                  styles.designDirectoryList,
                )}>
                {favouriteDesigns.map((design) => (
                  <DesignDirectoryCard key={design.id} design={design} />
                ))}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <h2 className={styles.designDirectoryHeader}>
              <Translate id="designdirectory.usersList.allUsers">All designs</Translate>
            </h2>
            <ul className={clsx('clean-list', styles.designDirectoryList)}>
              {otherDesigns.map((design) => (
                <DesignDirectoryCard key={design.id} design={design} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx(
              'margin-bottom--md',
              styles.designDirectoryFavouriteHeader,
            )}>
            <SearchBar />
          </div>
          <ul className={clsx('clean-list', styles.designDirectoryList)}>
            {filteredDesigns.map((design) => (
              <DesignDirectoryCard key={design.id} design={design} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function DesignDirectory(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <DesignDirectoryHeader />
        <DesignDirectoryFilters />
        <DesignDirectoryCards />
      </main>
    </Layout>
  );
}
