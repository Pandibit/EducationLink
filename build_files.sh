#!/bin/bash

# Installing Pipenv if not already installed
python3.9 -m pip install pipenv

# Installing dependencies from Pipfile
echo "Installing dependencies using Pipenv..."
pipenv install --deploy

# Running collectstatic using Pipenv to ensure it uses the right environment
echo "Collecting static files..."
pipenv run python manage.py collectstatic --noinput

# Optionally, you can add a command to check Django's availability
echo "Checking Django availability..."
pipenv run python -c "import django; print(django.get_version())"
