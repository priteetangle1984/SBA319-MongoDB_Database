const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const laptop = this.props.laptop;

        return (
            <DefaultLayout title="Show an Individual Laptop">
                <p>The {laptop.name} is {laptop.color} {laptop.brand} </p>
                {laptop.readyToUse ? 'It is ready to use' : "NOT READY!"}
                <br />
                <a href={`/laptops/${laptop._id}/edit`}>Edit This Laptop</a>
                <form action={`/laptops/${laptop._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/laptops">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;