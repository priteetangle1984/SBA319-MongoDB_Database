//phones/Edit.jsx
const React = require('react');
// As you can see we are using the app layout
const DefaultLayout = require('../layout/Default.jsx')

class Edit extends React.Component{
  render() {
    return (
      <DefaultLayout title="Edit Page">      
     {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
          {/* form is not complete we will do that below*/}
      <form action={`/phones/${this.props.phone._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.phone.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={this.props.phone.color}/><br/>
          Brand: <input type="text" name="brand"  defaultValue={this.props.phone.brand}/><br/>
          Is Ready To Use:
              { this.props.phone.readyToUse? <input type="checkbox" name="readyToUse" defaultChecked />: <input type="checkbox" name="readyToUse"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </DefaultLayout>
    )
  }
}
module.exports= Edit;