import type { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>Majer - about</title>
            </Head>
            <h1 className='heading-primary' >About me</h1>
            <p>
                Hello.
            </p>
            <p>
                My name is Michal and I am a programmer with a passion for crafting efficient and elegant solutions to complex problems.
                I have a bachelors degree from Faculty of Information Technology of the Brno University of Technology.
                No experience working in the industry (yet).
            </p>
            <p>
                I am skilled in a wide range of programming languages and technologies, including Rust, Python, and JavaScript,
                and I am always looking for opportunities to learn and grow as a developer.
                In my free time, I enjoy staying up-to-date with the latest developments in the field and exploring new tools and concepts.
            </p>
            <p>
                Tbh AI wrote most of this. Thanks AI ❤️
            </p>
        </>
    )
}

export default About
