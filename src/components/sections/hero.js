import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 50px;
  height: 100vh;
  background-color: rgb(105, 75, 105);

   @media (max-width: 768px) {
    height: auto; /* let content decide height */
    padding: 40px 20px; /* reduce padding */
  }

  @media (max-width: 576px) {
    padding: 30px 15px;
  }

  .hero-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    max-width: 1200px;
    width: 100%;
    padding-top: 120px;

    @media (max-width: 768px) {
      gap: 20px;
      padding: 60px 20px 20px;
    }

    @media (max-width: 576px) {
      gap: 15px;
      padding: 40px 15px 15px;
    }
  }

  .hero-content {
    flex: 1;
    max-width: 600px;

    h1 {
      color: #c49dc4;
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
      color: #b9abb6ff;
      font-size: clamp(60px, 4vw, 36px);
      margin-bottom: 20px;
    }

    p {
      color: #d0c3cd;
      font-size: clamp(14px, 2vw, 18px);
      line-height: 1.6;
      margin-bottom: 30px;

      /* Hide paragraph on smaller screens */
      @media (max-width: 768px) {
        display: none;
      }
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

    /* Text adjustments for small screens */
    @media (max-width: 768px) {
      h2 {
        font-size: clamp(32px, 8vw, 54px);
      }
      h3 {
        font-size: clamp(20px, 6vw, 36px);
      }
    }

    @media (max-width: 576px) {
      h2 {
        font-size: 28px;
      }
      h3 {
        font-size: 18px;
      }
    }
  }

  .hero-image {
    flex-shrink: 0;
    width: clamp(180px, 11vw, 370px);
    height: clamp(400px, 18vw, 420px);
    align-self: flex-start;
    margin-top: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      width: clamp(140px, 25vw, 220px);
      height: auto;
    }

    @media (max-width: 576px) {
      width: clamp(100px, 35vw, 160px);
      height: auto;
    }
  }
`;



// const StyledHeroSection = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   padding: 0 50px;
//   height: 100vh;
//   background-color: rgb(105, 75, 105);

//   .hero-inner {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 30px;
//     max-width: 1200px;
//     width: 100%;
//     padding-top: 120px;

//     @media (max-width: 768px) {
//       gap: 40px;
      
//     }
//   }

//   .hero-content {
//     flex: 1;
//     max-width: 600px;

//     h1 {
//       color: #c49dc4;
//       font-family: var(--font-mono);
//       font-size: clamp(12px, 2vw, 16px);
//       margin-bottom: 10px;
//     }

//     h2 {
//       color: #fff;
//       font-size: clamp(80px, 5vw, 54px);
//       font-weight: 800;
//       margin-bottom: 10px;
//       font-family: Hybi11 Amigo Bold;
//     }

//     h3 {
//       color: #b9abb6ff;
//       font-size: clamp(60px, 4vw, 36px);
//       margin-bottom: 20px;
//     }

//     p {
//       color: #d0c3cd;
//       font-size: clamp(14px, 2vw, 18px);
//       line-height: 1.6;
//       margin-bottom: 30px;
//     }

//     .email-link {
//       display: inline-block;
//       background-color: transparent;
//       border: 1px solid #fff;
//       color: #fff;
//       padding: 10px 18px;
//       border-radius: 5px;
//       text-decoration: none;
//       font-size: clamp(12px, 2vw, 16px);
//       transition: all 0.3s ease;

//       &:hover {
//         background-color: rgba(255, 255, 255, 0.1);
//       }
//     }
//   }

//   .hero-image {
//     flex-shrink: 0;
//     width: clamp(180px, 11vw, 370px);
//     height: clamp(400px, 18vw, 420px);
//     align-self: flex-start; /* aligns top with text */
//    margin-top: 10px;
//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }

    
//   }
// `;

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
      I’m a self-motivated, ambitious, and skilled software developer with a strong foundation in modern web technologies, always eager to take on new challenges and build impactful solutions
    </p>,
    // <a
    //   key="btn"
    //   className="email-link"
    //   href="https://www.linkedin.com/in/zwaqas/"
    //   target="_blank"
    //   rel="noreferrer">
    //   Connect with me on LinkedIn!
    // </a>,
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

