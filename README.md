# Using Split with multiple web components
Using Split SDK in a microfrontend environment

## What are microfrontends?
Micro Frontends are a relatively new architectural style that involves extending the concept of microservices to the frontend of an application. Essentially, in a micro frontend architecture, each UI module is developed, deployed, and maintained independently. This allows independent teams to move faster and have more control over their individual components. Similarly to microservices this requires well defined interfaces and APIs to ensure that intercommunication between micro frontends scales and is maintainable. 

In this example we will show how to use Split as a shared utility that is in scope for each of the micro frontends. In this case we are using web components. 


## Shared Split JS module
<img width="534" alt="image" src="https://github.com/kleinjoshuaa/Multiple-Web-Components/assets/1207274/2c9d0dc0-2418-414c-87d5-3521ef3e9da2">

This shared Split module will be injected into each of the microfrontend JS files. This allows for independent development and tooling without needing to have multiple Split Factory instances running the in the same browser. We have a little CSS based spinner in the HTML that is toggled by the `showPage()` function that is run when the SDK is ready. This allows there to be no flicker where the experiment is being loaded. The user will see a spinner, and then the treatment they are expected to see. This client is then exported to be used by other js modules as needed. The `key` here is set to a random string just for demo-able purposes. In a real implementation you would want to put the userid or anonymous id as the value for this variable.  Also remember to set the `authorizationKey` to your SDK Key.


## Module in Use
<img width="404" alt="image" src="https://github.com/kleinjoshuaa/Multiple-Web-Components/assets/1207274/300d9960-0997-47ee-abb8-b8590f2ee136">

Both modules use the pattern of importing the Split module, setting the variation styles, and then checking for SDK readiness before proceeding to define the component that will use Split for decisioning. 

In this example we have 2 modules. The first, `WordCount.js`, is a word count widget where the feature flag controls the color of the text in the end of the editable textbox. The second module, `MyParagraph.js` ,is a component with a background colored text that is controlled by a feature flag. The feature flags you will have to create are called `word_count_text` and `component2_style`. Feel free to adjust the names as you would like to based upon your flag naming conventions

## Final Result
In the below animation you can see the various variations that are possible. They are randomized independently. 

![wc](https://github.com/kleinjoshuaa/Multiple-Web-Components/assets/1207274/b741eead-cd5f-4c7c-8ab7-9e9572ab5036)

