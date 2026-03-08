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
  type Design,
  type Tag,
  MaintenanceStatuses,
  type MaintainedType,
  type MaintenanceStatus,
} from '@site/src/data/designs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DocusaurusSvg from '@site/static/img/logo.svg';
import {sortBy} from '@site/src/utils/jsUtils';
import Tooltip from '../DesignDirectoryTooltip/index';
import styles from './styles.module.css';

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({label, color, description}, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
    </li>
  ),
);

function DesignDirectoryCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `design_card_tag_${tagObject.tag}`;

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

function getCardImage(design: Design): string {
  var image = ""
  if(design.image == null){
      image = require('@site/static/img/favicon.ico').default;
    }
    else{
     image = require('@site/src/pages/designs/'+design.image).default;
    }
  return (
    image
    // Below is the original source. Replace this with our own screenshot generator.
    // design.preview ??
    // `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
    //   design.website,
    // )}/showcase`
  );
}

const MaintenanceStatusComp = React.forwardRef<HTMLLIElement, MaintenanceStatus>(
  ({label, icon, description}, ref) => (
    <p className={styles.designDirectoryCardMaintenanceStatus}>
      <span className={styles.maintenanceLabel}>Status:</span>
      <span ref={ref} className={styles.maintenanceStatus} title={description}>
        <span className={styles.textLabel}>{label.toLowerCase()}</span>
        <span className={styles.maintenanceStatusIcon}>{icon}</span>
      </span>
    </p>
  ),
);

function DesignDirectoryCardMaintenanceStatus({maintenanceStatus}: {maintenanceStatus: MaintainedType}): JSX.Element {
  const maintenanceStatusObject = MaintenanceStatuses[maintenanceStatus];
  return (
    <MaintenanceStatusComp {...maintenanceStatusObject} />
  );
};

function DesignDirectoryCard({design}: {design: Design}) {
  const image = getCardImage(design);
  return (
    <Link 
      to={design.website} 
      // className="card-link"
      className={clsx(
                'designDirectoryCardLink',
                styles.designDirectoryCardLink,
              )}
      target="_self"
    >
    <li key={design.name} className="card shadow--md">
      <div className={clsx('card__image', styles.designDirectoryCardImage)}>
        {/*<Image img={image} alt={design.name} />*/}
        <img src={image} />
      </div>
      <div className="card__body">
        <div className={clsx(styles.designDirectoryCardHeader)}>
          <h4 className={styles.designDirectoryCardTitle}>
            {design.name}
          </h4>
          {design.tags.includes('favourite') && (
            <FontAwesomeIcon icon={faHeart} className={styles.svgIconFavourite} size="sm" />
          )}
          {design.tags.includes('docusaurus') && (
            <DocusaurusSvg className={styles.svgIconDocusaurus} />
          )}
          {design.page && (
            <Link
              href={design.page}
              className={clsx(
                'button button--secondary button--sm',
                styles.designDirectoryCardSrcBtn,
              )}>
              <Translate id="designdirectory.card.sourceLink">website</Translate>
            </Link>
          )}
        </div>
        <p className={styles.designDirectoryCardBody}>{design.description}</p>
        <p className={styles.designDirectoryCardProfile}>
          <span className={styles.profileLabel}>Profile:</span><span className={styles.profile}>{design.profile}</span>
        </p>
        <p className={styles.designDirectoryCardAuthor}><span className={styles.authorLabel}>Company:</span><span className={styles.authorName}>{design.company}</span></p>
        <p className={styles.designDirectoryCardAuthor}><span className={styles.authorLabel}>License:</span><span className={styles.authorName}>{design.license}</span></p>
        {/*Removed the maintinance status information*/}
        {/*<DesignDirectoryCardMaintenanceStatus maintenanceStatus={design.maintenanceStatus} />*/}
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <DesignDirectoryCardTag tags={design.tags} />
      </ul>
    </li>
  </Link>
  );
}

export default React.memo(DesignDirectoryCard);
