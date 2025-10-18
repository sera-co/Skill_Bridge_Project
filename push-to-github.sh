#!/bin/bash

echo "🚀 SkillBridge GitHub Push Script"
echo ""
echo "Enter your GitHub Personal Access Token:"
read -s TOKEN

if [ -z "$TOKEN" ]; then
    echo "❌ No token provided"
    exit 1
fi

echo ""
echo "🔄 Pushing to GitHub..."
git push https://$TOKEN@github.com/Adrina0109/Skill_Bridge.git main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View at: https://github.com/Adrina0109/Skill_Bridge"
else
    echo ""
    echo "❌ Push failed. Check your token and permissions."
fi
