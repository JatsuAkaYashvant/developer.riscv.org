/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import {
  Tags,
  TagList,
  type TagType,
  type Device,
  type Tag,
  MaintenanceStatuses,
  type MaintainedType,
  type MaintenanceStatus,
} from '@site/src/data/devices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DocusaurusSvg from '@site/static/img/logo.svg';
import {sortBy} from '@site/src/utils/jsUtils';
import Tooltip from '../DeviceDirectoryTooltip/index';
import styles from './styles.module.css';

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({label, color, description}, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
    </li>
  ),
);

function DeviceDirectoryCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `device_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}>
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function getCardImage(device: Device): string {
  var image = ""
  if(device.image == null){
      image = require('@site/static/img/favicon.ico').default;
    }
    else{
     image = require('@site/src/pages/directory/'+device.image).default;
    }
  return (
    image
    // Below is the original source. Replace this with our own screenshot generator.
    // device.preview ??
    // `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
    //   device.website,
    // )}/showcase`
  );
}

const MaintenanceStatusComp = React.forwardRef<HTMLLIElement, MaintenanceStatus>(
  ({label, icon, description}, ref) => (
    <p className={styles.deviceDirectoryCardMaintenanceStatus}>
      <span className={styles.maintenanceLabel}>Status:</span>
      <span ref={ref} className={styles.maintenanceStatus} title={description}>
        <span className={styles.textLabel}>{label.toLowerCase()}</span>
        <span className={styles.maintenanceStatusIcon}>{icon}</span>
      </span>
    </p>
  ),
);

function DeviceDirectoryCardMaintenanceStatus({maintenanceStatus}: {maintenanceStatus: MaintainedType}): JSX.Element {
  const maintenanceStatusObject = MaintenanceStatuses[maintenanceStatus];
  return (
    <MaintenanceStatusComp {...maintenanceStatusObject} />
  );
};

function DeviceDirectoryCard({device}: {device: Device}) {
  const image = getCardImage(device);
  return (
    <Link 
      to={device.website} 
      // className="card-link"
      className={clsx(
                'deviceDirectoryCardLink',
                styles.deviceDirectoryCardLink,
              )}
      target="_self"
    >
    <li key={device.name} className="card shadow--md">
      <div className={clsx('card__image', styles.deviceDirectoryCardImage)}>
        {/*<Image img={image} alt={device.name} />*/}
        <img src={image} />
      </div>
      <div className="card__body">
        <div className={clsx(styles.deviceDirectoryCardHeader)}>
          <h4 className={styles.deviceDirectoryCardTitle}>
            {device.name}
          </h4>
          {device.tags.includes('favourite') && (
            <FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="sm" />
          )}
          {device.tags.includes('docusaurus') && (
            <DocusaurusSvg className={styles.svgIconDocusaurus} />
          )}
          {device.page && (
            <Link
              href={device.page}
              className={clsx(
                'button button--secondary button--sm',
                styles.deviceDirectoryCardSrcBtn,
              )}>
              <Translate id="devicedirectory.card.sourceLink">website</Translate>
            </Link>
          )}
        </div>
        <p className={styles.deviceDirectoryCardBody}>{device.description}</p>
        <p className={styles.deviceDirectoryCardProfile}>
          <span className={styles.profileLabel}>Profile:</span><span className={styles.profile}>{device.profile}</span>
        </p>
        {/*<p className={styles.deviceDirectoryCardAuthor}><span className={styles.authorLabel}>Author:</span><span className={styles.authorName}>{device.author}</span></p>*/}
        {/*Removed the maintinance status information*/}
        {/*<DeviceDirectoryCardMaintenanceStatus maintenanceStatus={device.maintenanceStatus} />*/}
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <DeviceDirectoryCardTag tags={device.tags} />
      </ul>
    </li>
  </Link>
  );
}

export default React.memo(DeviceDirectoryCard);
