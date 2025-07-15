package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.Revenue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Revenue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RevenueRepository extends JpaRepository<Revenue, Long> {}
