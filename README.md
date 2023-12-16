The diagnostics transporter extension can copy diagnostics from one place to another.
This is helpful if your development involves a file preprocessing stage that a language support extension does not expect.
In that case, the extension reports diagnostics for an intermediate file resulting from preprocessing, not the original file.
This makes it hard to find where the problem is in the original file.
Let's now copy the diagnostics back to the original file you are working on!

## Settings

### `diag-trans.pathReplacer`
 Dictionary of a regular expression and a replacer string pairs, which is used to replace the path part of the URI of a diagnostic. The diagnostic for the original URI is transferred to the replaced URI.

For instance, specifying the key-value pair `\\.txt$` and `.org` transfers diagnostics for `./foo.txt` to `./foo.org`.

The replacement uses [`String.prototype.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) in JavaScript. Please refer to the syntax of regular expressions and replacers on the document.
