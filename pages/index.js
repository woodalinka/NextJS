// import {useEffect, useState} from "react";
import Head from "next/head";
import {MongoClient} from "mongodb";
import MeetupList from '../components/meetups/MeetupList';
import {Fragment} from "react";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A first Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a second meetup!'
//     }
// ];

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    //
    // useEffect(() => {
    //   //set a http request and fetch data
    //   setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);

    return (
        <Fragment>
            <Head>
                <title> React/NextJS Meetups </title>
                <meta name="description"
                      content="Browse a huge list of highly active React meetups"/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
// //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect(
        'mongodb+srv://React:WAR3god!@cluster0.p7ldy.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();


    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 60
    };
}


export default HomePage;