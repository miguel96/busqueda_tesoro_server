module.exports={
    "extends":"airbnb",
    "env": {
        "es6"  : true,
        "node" : true
      },
      "rules": {
        "no-param-reassign": [
          "error",
            {
              "props": true,
              "ignorePropertyModificationsFor": ["req", "socket"]
            }
        ],
        "import/no-extraneous-dependencies": [
          "warn",
            {
              "devDependencies": true
            }
        ],
        "no-underscore-dangle": [
          "error",
            {
              "allow": ["_id"]
            }
        ]
      }
}