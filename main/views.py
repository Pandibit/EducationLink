from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods, require_POST, require_GET
from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from .forms import CreateUserForm, LoginForm
import json

# Authentication models and functions
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import Post, Class, Avatar, ClassMembership, Room, RoomMembership, Plan, Application, Announcement
import logging
from django.views.decorators.csrf import ensure_csrf_cookie


def main(request):
    return render(request, "main.html")


def register(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created!")
            return redirect("login_view")

    context = {"registerform": form}
    return render(request, "register.html", context=context)


@ensure_csrf_cookie
def login_view(request):

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


@login_required(login_url="login_view")
def homepage(request):
    current_user = request.user
    return render(request, "homepage.html", {"current_user": current_user})


@login_required(login_url="login_view")
def user_logout(request):
    auth.logout(request)
    return redirect("")


@login_required(login_url="login_view")
def posts(request):
    posts = Post.objects.filter(user=request.user)
    context = {"posts": posts}
    return render(request, "posts.html", context=context)


@login_required(login_url="login_view")
def save_post(request):
    if request.method == "POST":
        # Retrieve data from the POST request
        subject = request.POST.get("subject")
        short_description = request.POST.get("short_description")
        dropzone_file = request.FILES.get("dropzone_file")

        # Check if any required field is missing
        if not subject or not short_description or not dropzone_file:
            return JsonResponse({"error": "All fields are required."}, status=400)

        if dropzone_file is None:
            return JsonResponse({"error": "Please upload a post photo."}, status=400)

        # Check if the uploaded file is an image
        if not dropzone_file.content_type.startswith("image/"):
            return JsonResponse({"error": "Please upload an image file."}, status=400)

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


@login_required(login_url="login_view")
def delete_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == "POST":
        post.delete()
        return JsonResponse({"message": "Post deleted successfully"}, status=200)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@login_required(login_url="login_view")
def update_post(request, post_id):

    if request.method == "POST":
        # Retrieve the updated values from the request
        subject = request.POST.get("subject")
        short_description = request.POST.get("short_description")
        dropzone_file = request.FILES.get(
            "dropzone_file"
        )  # Use request.FILES to get file data

        # Update the post in the database
        try:
            post = Post.objects.get(pk=post_id)
            if subject:
                post.subject = subject
            if short_description:
                post.short_description = short_description

            if dropzone_file:
                post.dropzone_file = (
                    dropzone_file  # Update only if a new file is uploaded
                )
            post.save()
            return JsonResponse({"message": "Post updated successfully"})
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@login_required(login_url="login_view")
def classes(request):
    classes = Class.objects.filter(creator=request.user)
    context = {"classes": classes}
    return render(request, "classes.html", context=context)


@login_required(login_url="login_view")
def delete_class(request, class_id):

    spec_class = get_object_or_404(Class, pk=class_id)

    if request.user == spec_class.creator:
        spec_class.delete()

        return JsonResponse({"message": "Class deleted successfully"}, status=200)
    else:
        # Return a JSON response indicating unauthorized access
        return JsonResponse(
            {"error": "You are not authorized to delete this class"}, status=403
        )


@login_required(login_url="login_view")
def save_class(request):
    if request.method == "POST":
        # Retrieve data from the POST request
        name = request.POST.get("name")
        section = request.POST.get("section")
        subject = request.POST.get("subject")
        room = request.POST.get("room")
        class_photo = request.FILES.get("class_photo")

        # Check if any field is empty
        if not name:
            return JsonResponse({"error": "Please enter a class name."}, status=400)
        if not section:
            return JsonResponse({"error": "Please enter a section."}, status=400)
        if not subject:
            return JsonResponse({"error": "Please enter a subject."}, status=400)
        if not room:
            return JsonResponse({"error": "Please enter a room."}, status=400)

        # Check if a file was uploaded
        if class_photo is None:
            return JsonResponse({"error": "Please upload a class photo."}, status=400)

        # Check if the uploaded file is an image
        if not class_photo.content_type.startswith("image/"):
            return JsonResponse({"error": "Please upload an image file."}, status=400)

        # Create a new Class object
        new_class = Class.objects.create(
            creator=request.user,  # Assuming user is authenticated and available in the request
            name=name,
            section=section,
            subject=subject,
            room=room,
            class_photo=class_photo,
        )

        # Optionally, you can return a success message
        return JsonResponse({"message": "Class saved successfully!"})
    else:
        # Handle GET requests if needed
        pass


@login_required(login_url="login_view")
def spec_class(request, pk):
    spec_class = get_object_or_404(Class, pk=pk)
    class_memberships = ClassMembership.objects.filter(specific_class=spec_class)
    return render(
        request,
        "class.html",
        {"class": spec_class, "class_memberships": class_memberships},
    )


@login_required
def save_avatar(request):
    if request.method == "POST":
        # Get the image data from the request.FILES dictionary
        image_data = request.FILES.get("image")

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
            return JsonResponse({{"avatar_url": avatar.image.url}})

    # If the request method is not POST or image data is missing, return an error response
    return JsonResponse({"error": "Invalid request."}, status=400)


@require_GET
@login_required
def check_class_code(request):
    class_code = request.GET.get("code")
    class_exists = Class.objects.filter(code=class_code).exists()
    return JsonResponse({"exists": class_exists})


@login_required
def join_class(request):
    if request.method == "GET":
        class_code = request.GET.get("code")
        user = request.user

        try:
            specific_class = Class.objects.get(code=class_code)
        except Class.DoesNotExist:
            return JsonResponse({"error": "Class does not exist"}, status=404)

        # Check if the user is the creator of the class
        if specific_class.creator == user:
            return JsonResponse(
                {"status": "check_code", "member_status": "creator"}, status=200
            )

        # Check if the user is already a member of the class
        if ClassMembership.objects.filter(
            member=user, specific_class=specific_class
        ).exists():
            return JsonResponse(
                {"status": "already_member", "member_status": "existing"}, status=200
            )

        # Add the user as the newest member of the class
        ClassMembership.objects.create(member=user, specific_class=specific_class)

        return JsonResponse({"status": "success", "member_status": "added"}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@login_required
@require_POST
def unenroll_class(request, class_id):
    specific_class = get_object_or_404(Class, pk=class_id)
    user = request.user

    # Check if the user is a member of the class
    try:
        membership = ClassMembership.objects.get(
            member=user, specific_class=specific_class
        )
    except ClassMembership.DoesNotExist:
        return JsonResponse({"error": "You are not a member of this class"}, status=400)

    # Check if the user is the creator of the class
    if specific_class.creator == user:
        return JsonResponse(
            {"error": "You cannot unenroll from a class you created"}, status=400
        )

    # Remove the user from the class membership
    membership.delete()

    return JsonResponse({"message": "Successfully unenrolled from class"}, status=200)


@login_required(login_url="login_view")
def chatroom(request):
    rooms = Room.objects.filter(creator=request.user)
    return render(request, "chatroom.html", {"rooms": rooms})


@login_required(login_url="login")
def create_room(request):
    if request.method == "POST":
        # Retrieve data from the POST request
        name = request.POST.get("name")
        subject = request.POST.get("subject")
        room_photo = request.FILES.get("room_photo")

        # Validate file type (ensure it's an image)
        if not room_photo.content_type.startswith("image"):
            return JsonResponse({"error": "Please upload an image file."}, status=400)

        # Create a new Room object
        new_room = Room.objects.create(
            creator=request.user,  # Assuming user is authenticated and available in the request
            name=name,
            subject=subject,
            room_photo=room_photo,
        )

        # Return success message
        return JsonResponse({"message": "Room created successfully!"})
    else:
        # Handle GET requests if needed
        pass


@login_required(login_url="login")
@require_http_methods(["DELETE"])
def delete_room(request, room_id):
    if request.method == "DELETE":
        room = get_object_or_404(Room, pk=room_id)
        room.delete()
        return JsonResponse({"message": "Room deleted successfully"}, status=204)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


@login_required(login_url="login_view")
def spec_room(request, pk):
    spec_room = get_object_or_404(Room, pk=pk)
    room_memberships = RoomMembership.objects.filter(specific_room=spec_room)
    return render(
        request, "room.html", {"room": spec_room, "room_memberships": room_memberships}
    )


@login_required(login_url="login_view")
def class_members(request, pk):
    # Retrieve the class object using class_id
    my_class = get_object_or_404(Class, pk=pk)

    # Retrieve class memberships for the specific class
    class_memberships = ClassMembership.objects.filter(specific_class=my_class)

    # Render the class_members.html template with the retrieved data
    return render(
        request,
        "class_members.html",
        {"class": my_class, "class_memberships": class_memberships},
    )


@login_required(login_url="login_view")
def class_code(request, pk):

    my_class = get_object_or_404(Class, pk=pk)

    class_memberships = ClassMembership.objects.filter(specific_class=my_class)
    return render(request, "class_code.html", {"class": my_class})


@login_required(login_url="login_view")
def class_announcements(request, pk):
    # Retrieve the class object using pk
    my_class = get_object_or_404(Class, pk=pk)

    class_memberships = ClassMembership.objects.filter(specific_class=my_class)

    announcements = Announcement.objects.filter(specific_class=my_class)

    # Render the class_members.html template with the retrieved data
    return render(
        request,
        "class_announcements.html",
        {"my_class": my_class, "class_memberships": class_memberships, "announcements": announcements,},
    )


@login_required(login_url="login_view")
def class_calendar(request, pk):
    # Retrieve the class object using pk
    my_class = get_object_or_404(Class, pk=pk)

    class_memberships = ClassMembership.objects.filter(specific_class=my_class)

    # Render the class_members.html template with the retrieved data
    return render(
        request,
        "class_calendar.html",
        {"class": my_class, "class_memberships": class_memberships},
    )


@login_required(login_url="login_view")
def plan(request):
    current_user = request.user
    plans = Plan.objects.filter(user=request.user)
    return render(request, "plan.html", {"user": current_user, "plans": plans})


@login_required(login_url="login_view")
def save_plan(request):
    if request.method == "POST":

        activity = request.POST.get("activity")
        start_time = request.POST.get("start_time")
        end_time = request.POST.get("end_time")
        status = request.POST.get("status")

        # Check if all required fields are present
        if activity and start_time and end_time and status:
            try:
                # Create a new Plan object associated with the current authenticated user
                plan = Plan.objects.create(
                    activity=activity,
                    start_time=start_time,
                    end_time=end_time,
                    status=status,
                    user=request.user,  # Associate the plan with the authenticated user
                )
                return JsonResponse({"success": True})
            except Exception as e:
                return JsonResponse({"success": False, "error": str(e)}, status=500)
        else:
            return JsonResponse(
                {"success": False, "error": "Missing required fields"}, status=400
            )

    return JsonResponse(
        {"success": False, "error": "Invalid request method"}, status=405
    )


@require_http_methods(["DELETE"])
@ensure_csrf_cookie
def delete_plan(request, plan_id):

    plan = get_object_or_404(Plan, pk=plan_id)
    if request.user != plan.user:
        return JsonResponse(
            {"error": "You do not have permission to delete this plan."}, status=403
        )

    plan.delete()

    # Return a success response
    return JsonResponse({"message": "Plan deleted successfully."})



def get_plan_details(request, plan_id):
    try:
        plan = Plan.objects.get(pk=plan_id)
        plan_data = {
            'activity': plan.activity,
            'start_time': plan.start_time.strftime('%H:%M'),
            'end_time': plan.end_time.strftime('%H:%M'),
            'status': plan.status,
        }
        return JsonResponse(plan_data)
    except Plan.DoesNotExist:
        return JsonResponse({'error': 'Plan not found'}, status=404)


def update_plan(request, plan_id):
    plan = get_object_or_404(Plan, pk=plan_id)

    if request.method == 'POST':
        activity = request.POST.get('activity')
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')
        status = request.POST.get('status')

        # Update plan attributes
        plan.activity = activity
        plan.start_time = start_time
        plan.end_time = end_time
        plan.status = status
        plan.save()

        return JsonResponse({'message': 'Plan updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def contact(request):
    return render(request, 'contact.html')

def submit_application(request):
    if request.method == 'POST':
        # Retrieve data from the POST request
        data = json.loads(request.body)

        # Extract form fields
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        subject = data.get('subject', '')
        message = data.get('message', '')

        # Check if all required fields are present
        if first_name and last_name and email and subject and message:
            try:
                # Create a new Application object
                application = Application.objects.create(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    phone=phone,
                    subject=subject,
                    message=message
                )
                # Prepare JSON response
                response_data = {
                    'success': True,
                    'message': 'Application submitted successfully.',
                    'application_id': application.id
                }
                return JsonResponse(response_data)
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=500)
        else:
            return JsonResponse({'success': False, 'error': 'Missing required fields'}, status=400)

    # Return error response for unsupported request methods
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)



def create_announcement(request):
    if request.method == 'POST':
        data = request.POST
        content = data.get('content')
        class_id = data.get('class_id')
        
        if not content or not class_id:
            return JsonResponse({'success': False, 'error': 'Content and class ID are required.'}, status=400)

        try:
            specific_class = Class.objects.get(pk=class_id)
            announcement = Announcement.objects.create(
                member=request.user,
                specific_class=specific_class,
                content=content,
                
            )
            return JsonResponse({'success': True, 'message': 'Announcement created successfully.'})
        except Class.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Class does not exist.'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=405)