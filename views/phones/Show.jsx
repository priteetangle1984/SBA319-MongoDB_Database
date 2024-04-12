const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const phone = this.props.phone;

        return (
            <DefaultLayout title="Show an Individual Phone">
                <p>The {phone.name} is {phone.color} {phone.brand} </p>
                {phone.readyToUse ? 'It is ready to use' : "NOT READY!"}
                <br />
                <a href={`/phones/${phone._id}/edit`}>Edit This Phone</a>
                <form action={`/phones/${phone._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/phones">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;