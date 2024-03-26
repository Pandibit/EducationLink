from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from .forms import CreateUserForm, LoginForm

# Authentication models and functions
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import Post, Class, Avatar

# Create your views here.


def main(request):
    return render(request, "main.html")


def register(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created!")
            return redirect("login")

    context = {"registerform": form}
    return render(request, "register.html", context=context)


def login_view(request):
    if request.user.is_authenticated:  # Check if the user is already authenticated
        return redirect("homepage")  # Redirect logged-in users to the homepage

    form = LoginForm()

    if request.method == "POST":
        form = LoginForm(data=request.POST)

        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("homepage")

    context = {"loginform": form}

    return render(request, "login.html", context=context)


@login_required(login_url="login")
def homepage(request):
    current_user = request.user
    return render(request, "homepage.html", {"current_user": current_user})


@login_required(login_url="login")
def user_logout(request):
    auth.logout(request)
    return redirect("")


@login_required(login_url="login")
def posts(request):
    posts = Post.objects.filter(user=request.user)
    context = {"posts": posts}
    return render(request, "posts.html", context=context)


@login_required(login_url="login")
@login_required(login_url="login")
def save_post(request):
    if request.method == "POST":
        subject = request.POST.get("subject")
        short_description = request.POST.get("short_description")
        dropzone_file = request.FILES.get("dropzone_file")

        # Create and save the post
        post = Post(
            user=request.user,
            subject=subject,
            short_description=short_description,
            dropzone_file=dropzone_file,
        )
        post.save()

        return JsonResponse({"message": "Post saved successfully!"})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@login_required(login_url="login")
def classes(request):
    classes = Class.objects.filter(user=request.user)
    context = {"classes": classes}
    return render(request, "classes.html", context=context)


@login_required(login_url="login")
@csrf_exempt  # This decorator is used to allow POST requests without CSRF token for simplicity. Adjust as needed in your actual project.
def save_class(request):
    if request.method == 'POST':
        # Retrieve data from the POST request
        name = request.POST.get('name')
        section = request.POST.get('section')
        subject = request.POST.get('subject')
        room = request.POST.get('room')
        class_photo = request.FILES.get('class_photo')

        # Create a new Class object
        new_class = Class.objects.create(
            user=request.user,  # Assuming user is authenticated and available in the request
            name=name,
            section=section,
            subject=subject,
            room=room,
            class_photo=class_photo
        )

        # Optionally, you can return a success message
        return JsonResponse({'message': 'Class saved successfully!'})
    else:
        # Handle GET requests if needed
        pass


@login_required(login_url="login")
def spec_class(request, pk):
    spec_class = get_object_or_404(Class, pk=pk)
    # Pass the class object to the template
    return render(request, 'class.html', {'class': spec_class})



@login_required(login_url="login")
def chatroom(request):
    return render(request, "chatroom.html")


@login_required(login_url="login")
def quiz(request):
    return render(request, "quiz.html")



@login_required
def save_avatar(request):
    if request.method == 'POST':
        # Get the image data from the request.FILES dictionary
        image_data = request.FILES.get('image')

        # Check if the image data exists
        if image_data:
            # Check if the user already has an avatar
            if Avatar.objects.filter(user=request.user).exists():
                # If the user already has an avatar, update it
                avatar = Avatar.objects.get(user=request.user)
                avatar.image = image_data
                avatar.save()
            else:
                # If the user doesn't have an avatar, create a new one
                avatar = Avatar.objects.create(user=request.user, image=image_data)

            

            # Return a success response
            return JsonResponse({{'avatar_url': avatar.image.url}})

    # If the request method is not POST or image data is missing, return an error response
    return JsonResponse({'error': 'Invalid request.'}, status=400)