#!/usr/bin/env bash
# install-copilot.sh
# Cross-platform script to install GitHub Copilot.
# On Windows (Git Bash / MINGW64), winget is a native Windows executable and
# is not available in the Git Bash PATH, so this script delegates to
# PowerShell to run winget instead.

set -e

install_windows() {
  echo "Detected Windows (Git Bash / MINGW64)"
  echo "Invoking winget via PowerShell to install GitHub Copilot..."
  set +e
  powershell.exe -NoProfile -Command "winget install --id GitHub.Copilot -e"
  local exit_code=$?
  set -e
  if [ $exit_code -ne 0 ]; then
    echo "winget exited with code $exit_code. Installation may have failed."
    echo "Try running the following in PowerShell or Command Prompt manually:"
    echo "  winget install --id GitHub.Copilot -e"
    exit $exit_code
  fi
}

install_macos() {
  echo "Detected macOS"
  echo "Install GitHub Copilot from the VS Code Extensions Marketplace:"
  echo "  https://marketplace.visualstudio.com/items?itemName=GitHub.copilot"
  echo ""
  if command -v brew &>/dev/null; then
    echo "To also install GitHub Copilot for Xcode, run:"
    echo "  brew install --cask github-copilot-for-xcode"
  fi
}

install_linux() {
  echo "Detected Linux"
  echo "Install GitHub Copilot from the VS Code Extensions Marketplace:"
  echo "  https://marketplace.visualstudio.com/items?itemName=GitHub.copilot"
  echo ""
  echo "Or install the GitHub Copilot CLI via npm:"
  echo "  npm install -g @githubnext/github-copilot-cli"
}

case "$(uname -s)" in
  MINGW*|CYGWIN*|MSYS*)
    install_windows
    ;;
  Darwin*)
    install_macos
    ;;
  Linux*)
    install_linux
    ;;
  *)
    echo "Unsupported OS: $(uname -s)"
    echo "Please install GitHub Copilot manually:"
    echo "  https://docs.github.com/en/copilot/getting-started-with-github-copilot"
    exit 1
    ;;
esac

echo ""
echo "Done. See https://docs.github.com/en/copilot for next steps."
