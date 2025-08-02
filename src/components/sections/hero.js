import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  height: 100vh;
  background-color: rgb(105, 75, 105);

  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;

    @media (max-width: 768px) {
      gap: 40px;
    }
  }

  .hero-content {
    flex: 1;
    max-width: 600px;

    h1 {
      color: #ccc;
      font-family: var(--font-mono);
      font-size: clamp(12px, 2vw, 16px);
      margin-bottom: 10px;
    }

    h2 {
      color: #fff;
      font-size: clamp(80px, 5vw, 54px);
      font-weight: 800;
      margin-bottom: 10px;
      font-family: Hybi11 Amigo Bold;
    }

    h3 {
      color: #f0e4ec;
      font-size: clamp(60px, 4vw, 36px);
      margin-bottom: 20px;
    }

    p {
      color: #d0c3cd;
      font-size: clamp(14px, 2vw, 18px);
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .email-link {
      display: inline-block;
      background-color: transparent;
      border: 1px solid #fff;
      color: #fff;
      padding: 10px 18px;
      border-radius: 5px;
      text-decoration: none;
      font-size: clamp(12px, 2vw, 16px);
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .hero-image {
    flex-shrink: 0;
    width: clamp(180px, 11vw, 370px);
    height: auto;
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const heroImage = (
    <div className="hero-image">
      <img src="/heroimg.png" alt="Zainub Waqas" />
    </div>
  );

  const contentItems = [
    <h1 key="h1">Hi, I am</h1>,
    <h2 key="h2">zainub waqas.</h2>,
    <h3 key="h3">i deliver value by coding solutions that matter.</h3>,
    <p key="p">
      I am a self-motivated, ambitious and competent software engineer, with a deep appreciation
      for arts and creativity, always on the look for opportunities to grow in my knowledge,
      experience and skills.
    </p>,
    <a
      key="btn"
      className="email-link"
      href="https://www.linkedin.com/in/zwaqas/"
      target="_blank"
      rel="noreferrer">
      Connect with me on LinkedIn!
    </a>,
  ];

  return (
    <StyledHeroSection>
      <div className="hero-inner">
        {!prefersReducedMotion ? (
          <>
            <CSSTransition in={isMounted} classNames="fadeup" timeout={loaderDelay} appear>
              {heroImage}
            </CSSTransition>
            <div className="hero-content">
              <TransitionGroup component={null}>
                {isMounted &&
                  contentItems.map((item, i) => (
                    <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                      <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </div>
          </>
        ) : (
          <>
            {heroImage}
            <div className="hero-content">{contentItems}</div>
          </>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
