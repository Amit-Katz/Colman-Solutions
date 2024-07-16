import random
import math


def calculate_distance(point1, point2):
    return math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)


def calculate_total_distance(points_order, points):
    total_distance = 0
    for i in range(len(points_order) - 1):
        total_distance += calculate_distance(
            points[points_order[i]], points[points_order[i + 1]]
        )
    total_distance += calculate_distance(
        points[points_order[-1]], points[points_order[0]]
    )
    return total_distance


def initialize_population(population_size, num_points):
    population = []
    for _ in range(population_size):
        individual = list(range(num_points))
        random.shuffle(individual)
        population.append(individual)
    return population


def crossover(parent1, parent2):
    crossover_point = random.randint(0, len(parent1) - 1)
    child1 = parent1[:crossover_point] + [
        gene for gene in parent2 if gene not in parent1[:crossover_point]
    ]
    child2 = parent2[:crossover_point] + [
        gene for gene in parent1 if gene not in parent2[:crossover_point]
    ]
    return child1, child2


def mutate(individual, mutation_rate):
    for i in range(len(individual)):
        if random.random() < mutation_rate:
            j = random.randint(0, len(individual) - 1)
            individual[i], individual[j] = individual[j], individual[i]
    return individual


def genetic_algorithm(
    points, population_size=20, generations=50, crossover_rate=0.8, mutation_rate=0.1
):
    num_points = len(points)
    population = initialize_population(population_size, num_points)

    for _ in range(generations):
        population = sorted(
            population, key=lambda x: calculate_total_distance(x, points)
        )

        new_population = []

        new_population.append(population[0])

        while len(new_population) < population_size:
            parent1, parent2 = random.choices(
                population[:5], k=2
            )

            if random.random() < crossover_rate:
                child1, child2 = crossover(parent1, parent2)
            else:
                child1, child2 = parent1[:], parent2[:]
            child1 = mutate(child1, mutation_rate)
            child2 = mutate(child2, mutation_rate)
            new_population.extend([child1, child2])

        population = new_population

    best_solution_order = population[0]
    best_solution = [points[i] for i in best_solution_order]

    return best_solution


def solve(points):
    best_solution = genetic_algorithm(points)
    return best_solution
