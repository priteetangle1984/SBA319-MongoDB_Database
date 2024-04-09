const React = require('react');
const DefaultLayout = require('../layout/Default')

class Index extends React.Component {
    render() {
        const { phones } = this.props;
        // const phones = this.props.phones;

        return (
            <DefaultLayout title={"Phones Index Page"}>
                <nav>
                    <a href="/phones/new">Create a New Phone</a>
                </nav>
                <ul>
                    {phones.map((phone, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/phones/${phone._id}`}>
                                    {phone.name}
                                </a> {' '}
                                is {phone.color} <br></br>
                                {phone.readyToUse
                                ? `It is ready to use`
                            :   `It is NOT ready to use`}
                            <br />
                            <a href={`/phones/${phone._id}/edit`}>Edit This Phone</a>
                            <form action={`/phones/${phone._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE"/>
                            </form>
                            </li>
                        )
                    })

                    }
                </ul>
            </DefaultLayout>
        )
    }
}

module.exports = Index;