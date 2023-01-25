const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = 
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

  module.exports = defineConfig({
    e2e: {
    async setupNodeEvents(on, config) {
      on('task',{
        setDataStorage: (val)=>{
          return (dataStored=val);
        },
        getDataStorage:()=>{
          return dataStored
        },
        setItemIndex: (val)=>{
          return (itemIndex=val);
        },
        getItemIndex: ()=>{
          return itemIndex
        },
        setSupplierIndex: (val)=>{
          return (supplierIndex=val);
        },
        getSupplierIndex: ()=>{
          return supplierIndex;
        },
        setMySalesIndex: (val)=>{
          return (itemIndex=val);
        },
        getMySalesIndex: ()=>{
          return itemIndex;
        }


      })
     // implement node event listeners here
     const bundler = createBundler({
    // any ESBuild options here
    // https://esbuild.github.io/api/
    plugins: [createEsbuildPlugin(config)]
          })
        on('file:preprocessor', bundler);
        await addCucumberPreprocessorPlugin(on, config)
        return config;
        },
        specPattern: "cypress/e2e/features/*.feature",
        baseUrl: "https://www.saucedemo.com",
        chromeWebSecurity: false,
        scrollBehavior: false
    },
    });
    
