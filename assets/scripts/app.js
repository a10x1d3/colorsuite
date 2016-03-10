var colorApp = angular.module('colorApp', []);


colorApp.controller('Menu', function($scope) {
  $scope.config = {
    version: "3.0",
    developer: "Alden J. Curnutt",
    purpose: "To provide a set of practical color management tools, in one place, for front end development",
    contact: {
      email: "alden.curnutt@outlook.com",
      work: "443.654.1299",
      cell: "903.407.3876"
    }
  };

  $scope.tools = [
    {
      name: "Dynamic Color Selector",
      desc: "The Dynamic Color Selector is a custom element that allows a developer to locate any color of the rainbow and return the hexadecimal equivalent for styling and markup.",
      tabVal: "nav-dynamic",
      class: "active",
      image: {
        src: "assets/images/primary.png",
        alt: "Dynamic"
      }
    },
    {
      name: "Custom Color Palletes",
      desc: "The Custom Color Palette displays a collection of imported palettes for use when choosing single or multiple colors.   Each palette will display a color preview and the hexadecimal equivalent for styling and markup.",
      tabVal: "nav-palettes",
      class: "",
      image: {
        src: "assets/images/palette.png",
        alt: "Palette"
      }
    },
    {
      name: "Color Code Converter",
      desc: "The Color Code Converter allows a developer to convert hexadecimal color values to and from decimal (red, green, blue) quickly and efficently. &nbsp; Returned color values can be immediately used for styling and markup.",
      tabVal: "nav-convert",
      class: "",
      image: {
        src: "assets/images/arrows.png",
        alt: "Convert"
      }
    },
    {
      name: "Creative Color Palette",
      desc: "The Creative Color Palette allows a developer to dynamically create color palettes on the fly or quickly edit one of the many custom color palette presets included.",
      tabVal: "nav-creative",
      class: "",
      image: {
        src: "assets/images/creative.png",
        alt: "Creative"
      }
    }
  ];
})

colorApp.controller('colorSuite', function($scope) {
  $scope.toolList = [
    {
      name: "Dynamic",
      title: "Dynamic Color Selector",
      class: "active",
      tabVal: "tool-dynamic"
    },
    {
      name: "Palette",
      title: "Custom Color Palettes",
      class: "",
      tabVal: "tool-palette"
    },
    {
      name: "Convert",
      title: "Color Code Converter",
      class: "",
      tabVal: "tool-convert"
    },
    {
      name: "Creative",
      title: "Creative Color Palette",
      class: "",
      tabVal: "tool-creative"
    }
  ]

});