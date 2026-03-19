#!/bin/bash

# ============================================
#   Phaser + Webpack Setup Script
#   Usage: bash setup-phaser.sh
# ============================================

set -e

PROJECT_NAME="my-phaser-game"

# ─────────────────────────────────────────────
# STEP 1 — Check & fix Node.js version
# ─────────────────────────────────────────────
echo ""
echo "🔍 Checking Node.js version..."

if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v | sed 's/v//' | cut -d'.' -f1)
  echo "   Found Node.js v$(node -v | sed 's/v//')"

  if [ "$NODE_VERSION" -le 18 ]; then
    echo ""
    echo "⚠️  Node.js version is 18 or lower. Removing and reinstalling v20..."
    echo ""

    sudo apt-get remove --purge nodejs npm -y
    sudo apt-get autoremove -y
    sudo rm -rf /usr/local/lib/node_modules
    sudo rm -rf ~/.npm
    sudo rm -f /usr/bin/node /usr/bin/npm /usr/bin/npx

    echo "📦 Installing Node.js v20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs

    echo ""
    echo "✅ Node.js $(node -v) installed successfully!"
  else
    echo "✅ Node.js version is fine (v$(node -v | sed 's/v//'))"
  fi
else
  echo "   Node.js not found. Installing v20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  echo "✅ Node.js $(node -v) installed!"
fi

# ─────────────────────────────────────────────
# STEP 2 — Create project folder
# ─────────────────────────────────────────────
echo ""
echo "📁 Creating project: $PROJECT_NAME"

mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# ─────────────────────────────────────────────
# STEP 3 — npm init
# ─────────────────────────────────────────────
echo "📦 Initialising npm..."
npm init -y

# ─────────────────────────────────────────────
# STEP 4 — Create folder structure
# ─────────────────────────────────────────────
echo "📂 Creating folder structure..."
mkdir -p src/js src/assets
touch src/assets/.gitkeep

# ─────────────────────────────────────────────
# STEP 5 — Install dependencies
# ─────────────────────────────────────────────
echo ""
echo "📥 Installing Webpack and plugins..."
npm install webpack webpack-cli webpack-dev-server --save-dev
npm install html-webpack-plugin mini-css-extract-plugin copy-webpack-plugin html-loader --save-dev

echo ""
echo "📥 Installing Phaser..."
npm install phaser

# ─────────────────────────────────────────────
# STEP 6 — Create webpack.config.js
# ─────────────────────────────────────────────
echo "⚙️  Creating webpack.config.js..."
cat > webpack.config.js << 'EOF'
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/js/Main.js"),
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    hot: true,
    host: "localhost",
    port: 8082,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  target: "web",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
};
EOF

# ─────────────────────────────────────────────
# STEP 7 — Create index.html
# ─────────────────────────────────────────────
echo "📄 Creating src/index.html..."
cat > src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phaser Game</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
    </style>
  </head>
  <body>
    <div id="game"></div>
  </body>
</html>
EOF

# ─────────────────────────────────────────────
# STEP 8 — Create Main.js
# ─────────────────────────────────────────────
echo "🎮 Creating src/js/Main.js..."
cat > src/js/Main.js << 'EOF'
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1a1a2e",
  parent: "game",
  scene: {
    preload() {},
    create() {
      // Background rectangle
      this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

      // Title text
      this.add.text(400, 220, "Phaser is Working!", {
        fontSize: "42px",
        fill: "#ffffff",
        fontStyle: "bold",
      }).setOrigin(0.5);

      // Subtitle
      this.add.text(400, 290, "Webpack + Phaser 3 setup complete 🎮", {
        fontSize: "22px",
        fill: "#00d4aa",
      }).setOrigin(0.5);

      // Bouncing ball
      const ball = this.add.circle(400, 400, 30, 0xff6b6b);

      this.tweens.add({
        targets: ball,
        y: 480,
        duration: 600,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    },
  },
};

new Phaser.Game(config);
EOF

# ─────────────────────────────────────────────
# STEP 9 — Update package.json scripts
# ─────────────────────────────────────────────
echo "📝 Updating package.json..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.main = 'webpack.config.js';
pkg.scripts = {
  ...pkg.scripts,
  dev: 'webpack --mode development',
  build: 'webpack --mode production'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# ─────────────────────────────────────────────
# DONE
# ─────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅  Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "▶  To start your game, run:"
echo ""
echo "   cd $PROJECT_NAME"
echo "   npx webpack serve"
echo ""
echo "🌐 Then open browser at: http://localhost:8082"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
