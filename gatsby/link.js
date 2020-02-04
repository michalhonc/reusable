import React from 'react';
import { Link } from 'gatsby';

const GatsbyLink = ({
  href,
  text,
  className,
}) => {
  const isExternal = href?.includes('http');
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
      >
        {text}
      </a>
    );
  } else {
    return (
      <Link
        to={href}
        className={className}
      >
        {text}
      </Link>
    );
  }
}

export default GatsbyLink;
