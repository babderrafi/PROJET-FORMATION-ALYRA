package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.Distribution;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Distribution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistributionRepository extends JpaRepository<Distribution, Long> {}
