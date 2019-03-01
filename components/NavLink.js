import React from 'react';
import { Route, Link } from 'react-router-native';

function joinClassnames(...classnames) {
    return classnames.filter(i => i).join(' ');
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
function NavLink({
    'aria-current': ariaCurrent = 'page',
    activeClassName = 'active',
    activeStyle,
    className: classNameProp,
    exact,
    isActive: isActiveProp,
    location,
    strict,
    style: styleProp,
    to,
    render,
    ...rest
}) {
    const path = typeof to === 'object' ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath =
        path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

    return (
        <Route
            path={escapedPath}
            exact={exact}
            strict={strict}
            location={location}
            children={({ location, match }) => {
                const isActive = !!(isActiveProp
                    ? isActiveProp(match, location)
                    : match);

                const className = isActive
                    ? joinClassnames(classNameProp, activeClassName)
                    : classNameProp;
                const style = isActive
                    ? { ...styleProp, ...activeStyle }
                    : styleProp;

                return (
                    <Link
                        aria-current={(isActive && ariaCurrent) || null}
                        className={className}
                        style={style}
                        to={to}
                        {...rest}
                    >
                        {render(isActive)}
                    </Link>
                );
            }}
        />
    );
}

export default NavLink;
