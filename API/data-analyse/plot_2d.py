import matplotlib.pyplot as plt

def plot_2d(data, title): 
    # Prepare data for the plot
    x_data = []
    y_data = []
    
    # Prepare data for male and female
    male_x_data = []
    male_y_data = []
    female_x_data = []
    female_y_data = []
    
    for row in data:
        x_value = float(row[0])  # Assume 'time_of_test' is the X value
        y_value = float(row[1])  # Assume 'error_colors' is the Y value
        
        # Check if the gender is 'female' and multiply x_value by -1
        if row[2] == 'female':
            x_value *= -1
            female_x_data.append(x_value)
            female_y_data.append(y_value)
        else:
            male_x_data.append(x_value)
            male_y_data.append(y_value)

    # Create a scatter plot for male (blue) and female (red) with labels
    plt.scatter(male_x_data, male_y_data, color='blue', label='Male')
    plt.scatter(female_x_data, female_y_data, color='red', label='Female')

    # Plot settings
    plt.title(title)
    plt.xlabel("Czas testu [s]")
    plt.ylabel("Ilość błędów")

    # Set axes
    plt.axhline(0, color='black', linewidth=1)  # X axis
    plt.axvline(0, color='black', linewidth=1)  # Y axis

    # Add grid
    plt.grid(True)

    # Ensure y-axis starts from 0 and only increases by 1
    plt.ylim(bottom=-1)  # Ensure no negative Y-values
    plt.yticks(range(0, int(max(male_y_data + female_y_data)) + 2, 1))  # Y-axis ticks increase by 1

    # Optionally set axis limits to make the data more visible
    plt.xlim(min(male_x_data + female_x_data) - 10, max(male_x_data + female_x_data) + 10)

    # Show the legend
    plt.legend()

    # Show the plot
    plt.show()
