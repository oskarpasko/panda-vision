import matplotlib.pyplot as plt

def plot_2d(data, title): 
    # Prepare data for the plot
    x_data = []
    y_data = []
    # Assuming 'error_colors' is used for the y_data values
    for row in data:
        x_value = float(row[0])  # Assume 'time_of_test' is the X value
        y_value = float(row[1])  # Assume 'error_colors' is the Y value
        
        # Check if the gender is 'female' and multiply x_value by -1
        if row[2] == 'female':
            x_value *= -1
        
        x_data.append(x_value)
        y_data.append(y_value)

    # Create a scatter plot
    plt.scatter(x_data, y_data)

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

    # Show the plot
    plt.show()
