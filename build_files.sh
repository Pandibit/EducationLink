python3.9 -m ensurepip
python3.9 -m pip install --upgrade pip

# Install Pipenv
python3.9 -m pip install pipenv

# Install dependencies from Pipfile
echo "Installing dependencies using Pipenv..."
pipenv install --deploy

# Install additional dependencies from requirements.txt if necessary
echo "Installing additional dependencies from requirements.txt..."
pipenv run pip install -r requirements.txt

# Activate the virtual environment and collect static files
echo "Collecting static files..."
pipenv run python manage.py collectstatic --noinput

# Check Django's availability to ensure it's correctly installed
echo "Checking Django availability..."
pipenv run python -c "import django; print(django.get_version())"