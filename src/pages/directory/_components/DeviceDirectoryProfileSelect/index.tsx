/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useCallback,
  useState,
  useEffect,
  type ComponentProps,
  type ReactNode,
  type ReactElement,
} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import {toggleListItem} from '@site/src/utils/jsUtils';

import {prepareUserState} from '../../index';
import styles from './styles.module.css';
import { ProfileType } from '@site/src/data/devices';

interface Props extends ComponentProps<'input'> {
  icon: ReactElement<ComponentProps<'svg'>>;
  label: ReactNode;
  profile: ProfileType;
}

const ProfileQueryStringKey = 'profiled';

export function readProfile(search: string): ProfileType[] {
  return new URLSearchParams(search).getAll(ProfileQueryStringKey) as ProfileType[];
}

function replaceProfile(search: string, profile: ProfileType[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(ProfileQueryStringKey);
  profile.forEach((status) => searchParams.append(ProfileQueryStringKey, status));
  return searchParams.toString();
}

function DeviceDirectoryProfileSelect(
  {id, icon, label, profile, ...rest}: Props,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const statuses = readProfile(location.search);
    setSelected(statuses.includes(profile));
  }, [profile, location]);
  const toggleTag = useCallback(() => {
    const statuses = readProfile(location.search);
    const profiled = toggleListItem(statuses, profile);
    const newSearch = replaceProfile(location.search, profiled);
    history.push({
      ...location,
      search: newSearch,
      state: prepareUserState(),
    });
  }, [profile, location, history]);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="screen-reader-only"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggleTag();
          }
        }}
        onFocus={(e) => {
          if (e.relatedTarget) {
            e.target.nextElementSibling?.dispatchEvent(
              new KeyboardEvent('focus'),
            );
          }
        }}
        onBlur={(e) => {
          e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent('blur'));
        }}
        onChange={toggleTag}
        checked={selected}
        {...rest}
      />
      <label ref={ref} htmlFor={id} className={styles.checkboxLabel}>
        {label}
        {/*{icon}*/}
      </label>
    </>
  );
}

export default React.forwardRef(DeviceDirectoryProfileSelect);
