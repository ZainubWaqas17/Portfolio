import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    overflow: hidden;

    /* Removed: background-color: var(--green); */

    .img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--border-radius);
      filter: none;
      mix-blend-mode: normal;
      transition: none;
    }

    &:hover,
    &:focus {
      transform: none;

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    &:before,
    &:after {
      content: none;
    }
  }
`;


const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['React', 'Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Python'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
Hi, I’m Zainub Waqas - a software engineer driven by creativity and a love for problem solving. I enjoy crafting responsive user experiences and building smart tools that simplify everyday tasks.  </p>

            <p>
I'm currently pursuing a Bachelor's in Computer Science at UMass Amherst, where I’ve earned Dean’s List recognition and the Chancellor’s Award. My academic journey is complemented by hands-on industry experience - from interning with Marriott International’s Digital Technology team to building impactful full-stack solutions at Systems Limited.
            {/* {/* <p> */}
             {/* Over the past year, I’ve engineered:

AI-driven tools to automate API validation, increasing accuracy and reducing development time,

Full-stack applications using MERN and MEAN stacks (like GoLocal Guide, a travel companion app),

and scalable features in React, Angular, Python, and Node.js, improving both performance and user experience. */}
            </p> 

            <p>Some of the technologies that I have been exploring lately include:

            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
