import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io

def plot_2d(data, title): 
    # Prepare data for the plot
    x_data = []
    y_data = []
    colors = []  # To store color based on gender

    # Assuming 'error_colors' is used for the y_data values
    for row in data:
        x_value = float(row['time_of_test'])  # Assume 'time_of_test' is the X value
        y_value = float(row['error_colors'])  # Assume 'error_colors' is the Y value
        
        # Check if the gender is 'female' and multiply x_value by -1
        if row['sex'] == 'female':
            x_value *= -1
            colors.append('red')  # Female -> red
        else:
            colors.append('blue')  # Male -> blue
        
        x_data.append(x_value)
        y_data.append(y_value)

    # Create a scatter plot with different colors for male and female
    plt.scatter(x_data, y_data, c=colors)

    # Plot settings
    plt.title(title)
    plt.xlabel("Test Time")
    plt.ylabel("Error Count")

    # Set axes
    plt.axhline(0, color='black', linewidth=1)  # X axis
    plt.axvline(0, color='black', linewidth=1)  # Y axis

    # Add grid
    plt.grid(True)

    # Optionally set axis limits to make the data more visible
    plt.xlim(min(x_data) - 10, max(x_data) + 10)
    plt.ylim(min(y_data) - 1, max(y_data) + 1)

    # Set Y ticks with a step of 1
    plt.yticks(range(int(min(y_data)) - 1, int(max(y_data)) + 2))  # Step of 1 on Y-axis

    # Show the plot
    # plt.show()

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    return img
