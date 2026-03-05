import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Specification Developers',
    image: 'specdev.png',
    button:'Start Reading',
    link: '/docs/spec/reference',
    description: (
      <>
        For those contributing to the ISA or another specification. 
      </>
    ),
  },
  {
    title: 'Hardware Developers',
    image: 'hardwaredev.png',
    button:'Start Building',
    link: '/docs/hardware/overview',
    description: (
      <>
        For those enabling SoC's and other hardware DevKits. 
      </>
    ),
  },
  {
    title: 'Software Developers',
    image: 'softwaredev.png',
    button:'Start compiling',
    link: '/docs/software/overview',
    description: (
      <>
        For System and Application Developers who compile.
      </>
    ),
  },
];

function Feature({title, image,button,link, description}: FeatureItem) {
  var img = require('@site/static/img/'+image).default
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/*<Svg className={styles.featureSvg} role="img" />*/}
        <img src={img} role="img" width="200" height="200"/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={link}>
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row ">
          <div className="col text--center">
            <Heading as="h1">Get Started</Heading>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
