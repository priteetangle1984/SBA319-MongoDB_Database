const React = require('react');
const DefaultLayout = require('../layout/Default')

class Index extends React.Component {
    render() {
        const { laptops } = this.props;
        // const laptops = this.props.laptops;

        return (
            <DefaultLayout title={"Laptops Index Page"}>
                <nav>
                    <a href="/laptops/new">Create a New Laptop</a>
                </nav>
                <ul>
                    {laptops.map((laptop, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/laptops/${laptop._id}`}>
                                    {laptop.name}
                                </a> {' '}
                                is {laptop.color} <br></br>
                                {laptop.readyToUse
                                ? `It is ready to use`
                            :   `It is NOT ready to use`}
                            <br />
                            <a href={`/laptops/${laptop._id}/edit`}>Edit This Laptop</a>
                            <form action={`/laptops/${laptop._id}?_method=DELETE`} method="POST">
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