---
title: "Small JS Patterns: Config Object"
date: 2020-08-16T11:00:00.000Z
description: "First in JS Patterns Series, fun use of spread operator."
tags: [js]
---

Sharing here a quick JS pattern that I enjoy using when dealing with when representing some sort of configuration with an object.

##### TLDR: when using objects, and assigning key-value pairs, placing array brackets - \[ \] – around a variable will evaluate that variable's value instead of using the variable name.

This pattern is vanilla JS, so let's open up our dev tools within your favorite browser. Create an object that represents potential filters on a movie/tv show selection site:

```javascript
let filters = {
  category: ["Comedy", "Horror", "Sci-fi", "Anime"],
  maxDuration: 120,
};
```

We'll assume there is some data list/UI present that handles the possible values available to update this object, such as in this article.

Let's create a function that handles updating our filters value:

```javascript
const handleFiltersChange = (key, newValue) => {
  filters = {
    ...filters,
    [key]: newValue,
  };
};
```

Note handleFiltersChange accepts two parameters to facilitate updates – both the key of the value to be updated and the new value. We are using the array bracket wrappers over our key values to evaluate the variable value instead of just updating our filter object with a literal 'key' value.

Let's implement a counter-example without our square brackets to verify the difference:

```javascript
const handleFiltersChangeJustKey = (key, newValue) => {
  filters = {
    ...filters,
    key: newValue,
  };
};
```

Checking our original values persist:

```console
> filters
{
  category: ['Comedy', 'Horror', 'Sci-fi', 'Anime'],
  maxDuration: 120
}
```

Calling our second function, handleFiltersChangeJustKey:

```console
> handleFiltersChangeJustKey('maxDuration', 55)
> filters

{
  category: ['Comedy', 'Horror', 'Sci-fi', 'Anime'],
  maxDuration: 120, //expressed in minutes
  key: 55
}
```

Well, that's not the update we were looking for... Let's try calling our first function, handleFiltersChange:

```console
> handleFiltersChange ('maxDuration', 90)
> filters

{
  category: ['Comedy', 'Horror', 'Sci-fi', 'Anime'],
  maxDuration: 90,
  key: 55
}
```

Calling handleFiltersChange with a more complex data structure:

```console
> const newValues = ['Thriller', 'Drama', 'Romance']
> handleFiltersChange ('category', newValues)
> filters

{
  category: ['Thriller', 'Drama', 'Romance'],
  maxDuration: 90,
  key: 55
}
```

## That's it! Happy coding!
