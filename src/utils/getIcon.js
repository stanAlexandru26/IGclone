import React from 'react';
import sprite from '../assets/instagram-sprite.png';

export function IconLock() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-130px 0px`,
        height: '96px',
        width: '96px',
      }}
    ></span>
  );
}

export function IconInputError() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-249px -333px`,
        height: '22px',
        width: '22px',
      }}
    ></span>
  );
}

export function IconInputSuccess() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-225px -333px`,
        height: '22px',
        width: '22px',
      }}
    ></span>
  );
}
export function IconInputRefresh() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-273px -333px`,
        height: '22px',
        width: '22px',
      }}
    ></span>
  );
}
export function IconLogo() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0 -130px`,
        height: '51px',
        width: '175px',
      }}
    ></span>
  );
}
export function IconFacebookInverted() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-414px -300px`,
        height: '16px',
        width: '16px',
      }}
    ></span>
  );
}
export function IconFacebook() {
  return (
    <span
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-414px -259px`,
        height: '16px',
        width: '16px',
      }}
    ></span>
  );
}