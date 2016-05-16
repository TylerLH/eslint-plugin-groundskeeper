/**
 * @fileoverview Enforce use of <propTypes>{propTypes}</propTypes> pragma
 * @author Tyler Hughes
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-includes-proptypes-pragma');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

var settings = {
  react: {
    pragma: 'React'
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('jsx-includes-proptypes-pragma', rule, {

  valid: [
    {
      code: [
        `const Hello = React.createClass({
          // <propTypes>
          propTypes: {
            name: React.PropTypes.string.isRequired
          },
          // </propTypes>
          // Another comment
          render() {
            return <div>Hello world</div>
          }
        });
      `],
      parserOptions: parserOptions
    }
  ],

  invalid: [
    {
      code: [
        `const Hello = React.createClass({

          propTypes: {
            name: React.PropTypes.string.isRequired
          },

          // Another comment
          render() {
            return <div>Hello world</div>
          }
        });
      `],
      ecmaFeatures: {
        jsx: true
      },
      errors: [{
        message: '<propTypes>{...}</propTypes> pragma is missing.',
        line: 2,
        column: 6,
        type: 'Pragma'
      }]
    }
  ]
});
